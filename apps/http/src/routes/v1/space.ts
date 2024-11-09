import { Request, Response, Router } from "express";
import { userMiddleware } from "../../middleware/user";
import {
  AddElementSchema,
  CreateSpaceSchema,
  DeleteElementSchema,
} from "../../types";

import client from "@repo/db/client";

export const spaceRouter = Router();

spaceRouter.post("/", userMiddleware, async (req, res) => {
  const parsedData = CreateSpaceSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).jsonp({ message: "Validation failed" });
    return;
  }

  if (!parsedData.data.mapId) {
    const space = await client.space.create({
      data: {
        name: parsedData.data.name,
        width: parseInt(parsedData.data.dimensions.split("x")[0]),
        height: parseInt(parsedData.data.dimensions.split("x")[1]),
        creatorId: req.userId!,
      },
    });
    res.json({ spaceId: space.id });
    return;
  }

  const map = await client.map.findFirst({
    where: {
      id: parsedData.data.mapId,
    },
    select: {
      mapElements: true,
      width: true,
      height: true,
    },
  });

  if (!map) {
    res.status(400).json({ message: "Map not found" });
    return;
  }

  let space = await client.$transaction(async () => {
    const space = await client.space.create({
      data: {
        name: parsedData.data.name,
        width: map.width,
        height: map.height,
        creatorId: req.userId!,
      },
    });

    await client.spaceElements.createMany({
      data: map.mapElements.map((e) => ({
        spaceId: space.id,
        elementId: e.elementId,
        x: e.x!,
        y: e.y!,
      })),
    });
    return space;
  });
  console.log(space, "from space.ts 69");

  res.json({ spaceId: space.id });
});

spaceRouter.get("/all", userMiddleware, async (req, res) => {
  const spaces = await client.space.findMany({
    where: {
      creatorId: req.userId,
    },
  });

  res.json({
    spaces: spaces.map((s) => ({
      id: s.id,
      name: s.name,
      thumbnail: s.thumbnail,
      dimensions: `${s.width}x${s.height}`,
    })),
  });
});

spaceRouter.post("/element", userMiddleware, async (req, res) => {
  try {
    const parsedData = AddElementSchema.safeParse(req.body);
    console.log("Parsed Data:", parsedData);

    if (!parsedData.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: parsedData.error.errors,
      });
      return;
    }

    // Find the user's space
    const space = await client.space.findUnique({
      where: {
        id: parsedData.data.spaceId,
        creatorId: req.userId!,
      },
      select: {
        width: true,
        height: true,
      },
    });

    if (!space) {
      res.status(400).json({ message: "Space not found" });
      return;
    }

    // Check if the point is within the boundary
    if (
      parsedData.data.x < 0 ||
      parsedData.data.y < 0 ||
      parsedData.data.x >= space.width! || // Adjusted boundary check
      parsedData.data.y >= space.height! // Adjusted boundary check
    ) {
      res.status(400).json({ message: "Point is outside of the boundary" });
      return;
    }

    // Create the space element
    const newElement = await client.spaceElements.create({
      data: {
        spaceId: parsedData.data.spaceId,
        elementId: parsedData.data.elementId,
        x: parsedData.data.x,
        y: parsedData.data.y,
      },
    });

    res.json({
      message: "Element added successfully",
      elementId: newElement.id,
    });
  } catch (error) {
    console.error("Error adding element:", error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
});

// spaceRouter.post("/element", userMiddleware, async (req, res) => {
//   const parsedData = AddElementSchema.safeParse(req.body);
//   console.log(parsedData);
//   if (!parsedData.success) {
//     res.status(400).json({ message: "Validation failed" });
//     return;
//   }

//   //find the user space
//   const space = await client.space.findUnique({
//     where: {
//       id: parsedData.data.spaceId,
//       creatorId: req.userId!,
//     },
//     select: {
//       width: true,
//       height: true,
//     },
//   });

//   if (!space) {
//     res.status(400).json({ message: "Space not found" });
//     return;
//   }

//   if (
//     parsedData.data.x < 0 ||
//     parsedData.data.y < 0 ||
//     parsedData.data.x > space?.width! ||
//     parsedData.data.y > space?.height!
//   ) {
//     res.status(400).json({ message: "Point is outside of the boundary" });
//     return;
//   }

//   await client.spaceElements.create({
//     data: {
//       spaceId: parsedData.data.spaceId,
//       elementId: parsedData.data.elementId,
//       x: parsedData.data.x,
//       y: parsedData.data.y,
//     },
//   });
// });

spaceRouter.delete("/element", userMiddleware, async (req, res) => {
  const parsedData = AddElementSchema.safeParse(req.body);
  console.log("Parsed Data:", parsedData);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.errors,
    });
    return;
  }

  // Find the user's space
  const space = await client.space.findUnique({
    where: {
      id: parsedData.data.spaceId,
      creatorId: req.userId!,
    },
    select: {
      width: true,
      height: true,
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }

  // Check if the point is within the boundary
  if (
    parsedData.data.x < 0 ||
    parsedData.data.y < 0 ||
    parsedData.data.x >= space.width! || // Adjusted boundary check
    parsedData.data.y >= space.height! // Adjusted boundary check
  ) {
    res.status(400).json({ message: "Point is outside of the boundary" });
    return;
  }

  // Create the space element
  const newElement = await client.spaceElements.create({
    data: {
      spaceId: parsedData.data.spaceId,
      elementId: parsedData.data.elementId,
      x: parsedData.data.x,
      y: parsedData.data.y,
    },
  });

  res.json({
    message: "Element added successfully",
  });
});

spaceRouter.get("/:spaceId", async (req: Request, res) => {
  const space = await client.space.findUnique({
    where: {
      id: req.params.spaceId,
    },
    include: {
      elements: {
        include: {
          element: true,
        },
      },
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }

  res.json({
    dimensions: `${space.width}x${space.height}`,
    elements: space.elements.map((e) => ({
      id: e.id,
      element: {
        id: e.element.id,
        imageUrl: e.element.imageUrl,
        width: e.element.width,
        height: e.element.height,
        static: e.element.static,
      },
      x: e.x,
      y: e.y,
    })),
  });
});

spaceRouter.delete("/:spaceId", userMiddleware, async (req, res) => {
  const space = await client.space.findUnique({
    where: {
      id: req.params.spaceId,
    },
    select: {
      creatorId: true,
    },
  });

  if (!space) {
    res.status(400).json({ message: "Space not found" });
    return;
  }

  if (space.creatorId !== req.userId) {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  await client.space.delete({
    where: {
      id: req.params.spaceId,
    },
  });

  res.status(200).json({ message: "Space deleted" });
});

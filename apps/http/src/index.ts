import express from "express";
import { router } from "./routes/v1";
import client from "@repo/db/client";

const app = express();
app.use(express.json());

// client.user.findMany().then((users) => console.log(users));

app.use("/api/v1", router);
// console.log("updated the server");

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

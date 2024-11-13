import { PrismaClient } from "@prisma/client";

export default new PrismaClient();
// const fs = require("fs");
// const pg = require("pg");
// const url = require("url");

// const config = {
//   user: "avnadmin",
//   password:"",
//   host: "pg-11db5acb-itsme-4a3f.l.aivencloud.com",
//   port: 26818,
//   database: "defaultdb",
//   ssl: {
//     rejectUnauthorized: true,
//     ca: `-----BEGIN CERTIFICATE-----
// MIIEQTCCAqmgAwIBAgIUYO0VVM8yBaJVZXd0xWGqb538OwgwDQYJKoZIhvcNAQEM
// BQAwOjE4MDYGA1UEAwwvOGJhZTU4OGEtMTI0Mi00YTc5LWE2ZmMtYTU0YjQyNWYy
// N2Y4IFByb2plY3QgQ0EwHhcNMjQxMDAzMTkwNTIxWhcNMzQxMDAxMTkwNTIxWjA6
// MTgwNgYDVQQDDC84YmFlNTg4YS0xMjQyLTRhNzktYTZmYy1hNTRiNDI1ZjI3Zjgg
// UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALrDsEje
// zXuJ3ijDpr5YMPkkTMri/Pb4zJ3H1aTE7Fn/FW402Ma2LQBUwkExLC0LqLAtvY5W
// gkbLqwam937BXNCkTQ2JPhGhSUDpUbcF1C3czDQdqkJav3Arn6yj366dkdstEYpP
// PBboQyr0ZDvw0ZjCBMk+W+7CuIcrutY/HStHLPukD2LlRTe0uqWhPgw8AI/dZeun
// 5Q2COU8p8iIfWblClLGIXzjyvTXkZ3Z3mFW5caYmZI9SyrE3Cr7HYCwmmyXzF+U7
// uIIW/RZedwfPSmSsjfj+7MWXMZyv89LmHF8i6xFvdqrX64gako173HqKqwfu9Uyf
// vp/6/tp5gM9DFHW1AZRYO22uLSSdgIUVwNIaPcAAT/V2V1g4qgJQCRUnPAntlv4O
// rpTdjCTOmI4m43ZOG/iYS5HUE5C/ubnfbnw2wog/1HgH1TnG6CM1c2PBT8CMZv4m
// vYOhW4/YYIK1BNZfxh1tfquN/rT0tS3ajrzW4g+vW0QikMJU9upW9VVACwIDAQAB
// oz8wPTAdBgNVHQ4EFgQUyP7SoPkAHyjUMNmI+SuMNEie4TcwDwYDVR0TBAgwBgEB
// /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAI0niJZ3GKnoqoSj
// FKQOKZP+dcnMj0JpCK8gsA+EwlWoNrh0X6upW6jY5UFTrKUVznQXtRQbV8++z6i7
// h2oSVZkeTGu11hAuvbgYHEsivRD1CONb+GKMk3K7pY9/Uf4VNetc8X9hY/rwwH5t
// XfIEKEGYAYFwfjDdkwn8jE+9SFKeRxB439KFzDukmEnpcl5d8KcVKvECNzljTgee
// kNga0q9naleNolmRWVcF/lJBjWk2iFdPUAJU/chOVyIZH54+TP7WcAEKUHpfIna5
// KVRoqGy+y90PA9OO2ssH1oLhM7VzDPjkFZGSxcgYumeTyaTVWBa6MqMwJ36h4mco
// X3z4bh2M2tuAoC6s4mZAgr+m+xVzKLy5XHuDyaRni4A5mrVE54Dft0SCz8PZ+AUU
// MwuMNEqdZ/V5VQfTLFCGWV5d4d+FiY+Y50UopUXuxV33M4ymbrgmAUcIgTfuh9W0
// 39g4HTX5Rvwb0ZgFz5ofpf6GXtBakC8vEqMFufjkIMOc5d052g==
// -----END CERTIFICATE-----`,
//   },
// };

// const client = new pg.Client(config);
// client.connect(function (err) {
//   if (err) throw err;
//   client.query("SELECT VERSION()", [], function (err, result) {
//     if (err) throw err;

//     console.log(result.rows[0].version);
//     client.end(function (err) {
//       if (err) throw err;
//     });
//   });
// });

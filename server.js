import express from "express";
import dotenv from "dotenv";
import fs from "node:fs";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

//routes
const routeFiles = fs.readdirSync("./backend/src/routes");

routeFiles.forEach((file) => {
  // use dynamic import
  import(`./backend/src/routes/${file}`)
    .then((route) => {
      app.use("/api/v1", route.default);
    })
    .catch((err) => {
      console.log("Failed to load route file", err);
    });
});

const server = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to strt server!", error.message);
    process.exit(1);
  }
};

server();
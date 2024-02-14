import express from "express";
import { PORT } from "./config.js";
import { generateProfiles } from "./helper.js";

const app = express();

app.get("/", (request, response) => {
  return response.status(200).send("Service is up");
});

app.get("/api/generateProfile/:number", (request, response) => {
  const { number } = request.params;
  if (isNaN(number)) {
    return response.status(400).send("Bad request");
  }
  const profiles = generateProfiles(number);
  return response.status(200).send(profiles);
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

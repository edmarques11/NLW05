import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello NLW05" });
});

app.post("/users", (request, response) => {
  return response.json({ message: "User saved with success!" });
});

const PORT = process.env.PORT ? process.env.PORT : 3333;

app.listen(PORT, () => console.log("Server is running on port", PORT));

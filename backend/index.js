import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/books.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/books', booksRouter);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

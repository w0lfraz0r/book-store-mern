import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/books", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: "Invalid Input" });
    } else {
      const { title, author, publishYear } = req.body;
      const newBook = { title, author, publishYear };
      const book = await Book.create(newBook);
      res.status(201).send(book);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      count: books.length,
      books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

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

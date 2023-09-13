import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
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

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ message: "Resource not found" });
    } else if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: "Invalid Input" });
    } else {
      const book = await Book.findByIdAndUpdate(id, req.body);
      res.status(201).send(book);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send({ message: "Resource not found" });
    } else {
      const isDeleted = await Book.findByIdAndDelete(id);
      if (!isDeleted) {
        res.status(400).send({ message: "Resource not found" });
      } else {
        res.status(201).send({ message: "book deleted" });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router; 
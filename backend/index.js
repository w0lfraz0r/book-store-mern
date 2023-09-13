import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/books", async (req, res) => {
    const {title, author, publishYear} = req.body;
    try {
        if (!title || !author || !publishYear){
            res.status(400).send({message: 'Invalid Input'});
        } else {
            const newBook = {title, author, publishYear};
            const book = await Book.create(newBook);
            res.status(201).send(book);
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
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

import express from "express";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/books.js";

const app = express();

app.use(express.json());

app.use(cors()); //allow everything

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// ); //allow specific

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/books", booksRouter);
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

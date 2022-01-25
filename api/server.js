import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("hiiiii");
});

const DB = process.env.DB_URL.replace(`<password>`, process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase is Online!!🚀🚀🤘"))
  .catch((err) => console.log(err));

// yIvfoAwtduVW4qz5

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

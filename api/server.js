const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
// const  userRoutes = require("./routes/authRouter.js";

dotenv.config();
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use(mongoSanitize());
app.use(xss());

app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json("Dumb server is fine, your code isn't :(");
});

app.use("/api", require("./routes/authRouter"));

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
  console.log(`Listening on port🙉🙉👂 ${port}`);
});

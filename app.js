const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const contactsRouter = require("./routes/contacts");
// const userAuthRouter = require("./routes/userAuth");
const dotenv = require("dotenv");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

dotenv.config();

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
// app.use("/api/users", userAuthRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

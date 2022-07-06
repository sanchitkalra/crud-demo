const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const User = require("./schema");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello World!");
});

// R
app.get("/users", async (_, res) => {
  try {
    const result = await User.find();
    console.log(result);

    res.json({
      status: "ok",
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "not ok",
      err,
    });
  }
});

// C
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const result = await User.create({
      name,
      email,
      password,
    });

    console.log(result);
    res.json({
      status: "ok",
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "not ok",
    });
  }
});

// D
app.delete("/users", async (req, res) => {
  const { id } = req.query;

  try {
    const result = await User.deleteOne({ _id: id });

    console.log(result);
    res.json({
      status: "ok",
      result,
    });
  } catch (err) {
    res.status(500).json({
      status: "not ok",
    });
  }
});

mongoose.connect("mongodb://localhost:27017/usersdb", () => {
  console.log("Connect");

  app.listen(4000, () => {
    console.log("Server active");
  });
});

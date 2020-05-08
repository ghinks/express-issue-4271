const express = require("express");
const app = express();
const port = 3003;
const handler = (req, res) => {
  try {
    res.status(200)
      .send("ok")
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const throwMyError = (req, res) => {
  throw new Error('my home made error');
};

const passMyError = (req, res, next) => {
  next(new Error('my passed error'));
};

const myErrorHandler = ( err, req, res, next) => {
  console.error(`error was ${err.message}`);
  res.status(200).json({ message: "opps"});
};

app.get("/throw", [ throwMyError]);
app.get("/pass", [ passMyError ]);
app.get("/", [ handler ]);
app.use(myErrorHandler);
app.listen(port, () => console.log(`issue 3003 listening on port ${port}!`));

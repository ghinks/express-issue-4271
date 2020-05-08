"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 3003;
var handler = function (req, res) {
    try {
        res.status(200)
            .send("ok");
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};
var throwMyError = function (req, res) {
    throw new Error('my home made error');
};
var passMyError = function (req, res, next) {
    next(new Error('my passed error'));
};
var myErrorHandler = function (err, req, res, next) {
    console.error("error was " + err.message);
    res.status(200).json({ message: "opps" });
};
app.get("/throw", [throwMyError]);
app.get("/pass", [passMyError]);
app.get("/", [handler]);
app.use(myErrorHandler);
app.listen(port, function () { return console.log("issue 3003 listening on port " + port + "!"); });

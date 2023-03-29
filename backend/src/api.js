const handlers = require("./handlers/handlers.js");
const express = require("express");

let router = express.Router();

router.post("/", (req, res, next) => {
  let object = req.body.method;
  object = object.split(".");
  let handler = object[0];
  let method = object[1];

  if (!handler || !method) {
    res.json({
      id: req.body.id,
      error: { message: "Not JSON-RPC" },
      result: null,
    });
    return;
  }

  if (handlers[handler] && handlers[handler][method]) {
    handlers[handler][method](req, res, next);
  }
});

module.exports = router;

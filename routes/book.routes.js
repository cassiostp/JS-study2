const express = require("express");
const router = express.Router();
const books = require("../controllers/book.controller");

router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render("login", {
      message: "You must be logged in to access that page."
    });
  }
});

router.get("/(.json)?", function(req, res) {
  if (req.path === "/.json") {
    books.findAll(req, res);
  } else {
    res.render("books");
  }
});

router.post("/", books.create);

router.get("/:bookId", books.findOne);

router.put("/:bookId", books.update);

router.delete("/:bookId", books.delete);

module.exports = router;

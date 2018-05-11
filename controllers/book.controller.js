var Book = require("../models/book.model");

exports.create = function(req, res) {
  if (!req.body.title || !req.body.author) {
    return res.status(400).send({
      message: "Can not create book without title or author"
    });
  }
  let book = new Book({
    title: req.body.title,
    author: req.body.author
  });
  book.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "There was a problem registering the book"
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = function(req, res) {
  Book.find(function(err, books) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .render("error", { message: "Internal Server Error", error: err });
    } else {
      res.render("books", { title: "Books", books: books });
    }
  });
};

exports.findAllJson = function(req, res) {
  Book.find(function(err, books) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Error retrieving books" });
    } else {
      res.send(books);
    }
  });
};

exports.findOne = function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book with id " + req.params.bookId + " not found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.bookId
      });
    }
    if (!book) {
      return res.status(404).send({
        message: "Book with id " + req.params.bookId + " not found"
      });
    }
    res.send(book);
  });
};

exports.update = function(req, res) {
  Book.findById(req.params.bookId, function(err, book) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book with id " + req.params.bookId + " not found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.bookId
      });
    }
    if (!book) {
      return res.status(404).send({
        message: "Book with id " + req.params.bookId + " not found"
      });
    }
    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;
    book.save(function(err, data) {
      if (err) {
        res.status(500).send({
          message: "Failed to update book with id" + req.params.bookId
        });
      } else {
        res.send(data);
      }
    });
  });
};

exports.delete = function(req, res) {
  Book.findByIdAndRemove(req.params.bookId, function(err, book) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Book with id " + req.params.bookId + " not found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving book with id " + req.params.bookId
      });
    }
    if (!book) {
      return res.status(404).send({
        message: "Book with id " + req.params.bookId + " not found"
      });
    }
    res.send({
      message: "Book removed from database successfully!"
    });
  });
};

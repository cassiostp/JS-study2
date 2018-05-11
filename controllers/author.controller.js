const Author = require("../models/author.model");
const Book = require("../models/book.model");

exports.create = function(req, res) {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Can not register author without a name"
    });
  }
  let author = new Author({
    name: req.body.name,
    age: req.body.age || "Unknown"
  });
  author.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "There was a problem registering the author"
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = function(req, res) {
  Author.find(function(err, authors) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .render("error", { message: "Internal Server Error", error: err });
    } else {
      res.render("author", { title: "Authors", authors: authors });
    }
  });
};

exports.findAllJson = function(req, res) {
  Author.find(function(err, authors) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error retrieving authors" });
    } else {
      res.json(authors);
    }
  });
};

exports.findOne = function(req, res) {
  Author.findById(req.params.authorId, function(err, author) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).render("error", {
          message: "Author with id " + req.params.authorId + " not found",
          error: err,
          status: res.statusCode
        });
      }
      res.status(500).render("error", {
        message: "Error retrieving author with id " + req.params.authorId,
        error: err,
        status: res.statusCode
      });
    }
    if (!author) {
      return res.status(404).render("error", {
        message: "Author with id " + req.params.authorId + " not found",
        error: err,
        status: res.statusCode
      });
    }
    res.render("author", { title: "Author", authors: [author] });
  });
};

exports.findOneJson = function(req, res) {
  Author.findById(req.params.authorId, function(err, author) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Author with id " + req.params.authorId + " not found"
        });
      }
      return res.status(500).json({
        message: "Error retrieving author with id " + req.params.authorId
      });
    }
    if (!author) {
      return res.status(404).json({
        message: "Author with id " + req.params.authorId + " not found"
      });
    }
    res.json(author);
  });
};

exports.update = function(req, res) {
  Author.findById(req.params.authorId, function(err, author) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "Author with id " + req.params.authorId + " not found"
        });
      }
      return res.status(500).json({
        message: "Error retrieving author with id " + req.params.authorId
      });
    }
    if (!author) {
      return res.status(404).json({
        message: "Author with id " + req.params.authorId + " not found"
      });
    }
    if (req.body.name) author.name = req.body.name;
    if (req.body.age) author.age = req.body.age;
    author.save(function(err, data) {
      if (err) {
        res.status(500).json({
          message: "Failed to update author with id" + req.params.authorId
        });
      } else {
        res.json(data);
      }
    });
  });
};

exports.delete = function(req, res) {
  Author.findById(req.params.authorId, function(err, author) {
    if (err) {
      console.log(err.kind);
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Author with id " + req.params.authorId + " not found"
        });
      }
      return res.status(500).send({
        message: "Error retrieving author with id " + req.params.authorId
      });
    }
    if (!author) {
      return res.status(404).send({
        message: "Author with id " + req.params.authorId + " not found"
      });
    }
    Author.schema.pre("remove", async function() {
      await Book.find({ author: req.params.authorId }, function(err, books) {
        if (err) {
          return res.status(500).send({
            message: "Error retrieving books from this author"
          });
        }
        books.forEach(book =>
          book.remove(function(err) {
            if (err) {
              return res.status(500).send({
                message: "Could not remove all the books from " + author.name
              });
            }
          })
        );
      });
    });
    author.remove(function(err) {
      if (err) {
        return res.status(500).send({
          message: "Failed to remove " + author.name
        });
      }
      res.send({
        message: "Author removed from database successfully!"
      });
    });
  });
};

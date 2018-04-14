const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup", {});
});

router.post("/signup", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, account) => {
      if (err) {
        console.log(err);
        return res.render("signup", { account: account });
      }
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  );
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      next();
    }
    if (!user) {
      return res.render("login", { message: info.message });
    }
    req.logIn(user, err => {
      if (err) {
        console.log(err);
      }
      return res.redirect("/");
    });
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;

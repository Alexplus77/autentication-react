const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const passport = require("passport");
const passportJWT = require("passport-jwt");

const tokens = new Map();
const users = [];
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send([{ Alex: "677888" }]);
});
app.post("/registration", (req, res) => {
  !users.some((user) => user.username === req.body.username)
    ? users.push({
        id: uuid.v4(),
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 1),
        avatar: "https://1avatara.ru/pic/men/man0003.jpg",
      })
    : res.send({ error: true });
});
app.post("/auth", (req, res) => {
  const authUser = users.filter(
    ({ username, password }) =>
      username === req.body.username &&
      bcrypt.compareSync(req.body.password, password)
  )[0];
  authUser ? res.send({ ...authUser, auth: true }) : res.send({ auth: false });
});
app.listen(8080, () => console.log("Server has been started at port 8080"));

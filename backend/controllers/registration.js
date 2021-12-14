const users = require("../db/db");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

console.log(users.db);

exports.registration = (req, res) => {
  try {
    !users.db.some((user) => user.username === req.body.username)
      ? users.db.push({
          id: uuid.v4(),
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 1),
          avatar: "https://1avatara.ru/pic/men/man0003.jpg",
        })
      : res.status(400).send({ error: true });
  } catch (e) {
    console.log(e);
  }
};

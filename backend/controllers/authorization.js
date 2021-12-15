const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../db/db");

const generateToken = (id) => {
  const payload = {
    id: id,
  };
  return jwt.sign(payload, "Very secret words", { expiresIn: "1h" });
};
exports.authorization = (req, res) => {
  try {
    const authUser = users.db.filter(
      ({ username, password }) =>
        username === req.body.username &&
        bcrypt.compareSync(req.body.password, password)
    )[0];

    const { id, username, avatar } = authUser;
    if (id) {
      const token = generateToken(id);
      res.status(200).send({ id, username, avatar, token });
    }
  } catch (e) {
    res.status(401).send({ id: null });
    console.log(e);
  }
};

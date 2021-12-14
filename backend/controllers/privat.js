const jwt = require("jsonwebtoken");
const users = require("../db/db");
exports.privat = async (req, res) => {
  try {
    const token = await JSON.parse(req.headers["authorization"].split(" ")[1]);
    token &&
      (await jwt.verify(token, "Very secret words", (err, decoded) => {
        err && res.status(401).send({ message: "error" });
        decoded &&
          res
            .status(200)
            .send(users.db.filter(({ id }) => id === decoded.id)[0]);
      }));
  } catch (e) {
    console.log(e);
  }
};

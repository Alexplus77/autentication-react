const express = require("express");
const router = express.Router();

const registration = require("../controllers/registration");
const authorization = require("../controllers/authorization");
const privat = require("../controllers/privat");

router.post("/registration", registration.registration);
router.post("/auth", authorization.authorization);
router.get("/privat", privat.privat);

module.exports = router;

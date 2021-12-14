const express = require("express");
const bodyParser = require("body-parser");
const serverRoutes = require("./Routers/routers");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serverRoutes);

app.listen(8080, () => console.log("Server has been started at port 8080"));

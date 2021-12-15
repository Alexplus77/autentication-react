const express = require("express");
const bodyParser = require("body-parser");
const serverRoutes = require("./Routers/routers");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serverRoutes);

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

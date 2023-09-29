const express = require("express")
const app = express();

app.use(express.json());


app.use(require("./v1/routes"))


module.exports = app
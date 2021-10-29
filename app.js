var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var compression = require("compression");
var helmet = require("helmet");

const PORT = process.env.PORT || 3400;

require("./config/database");

var usersRouter = require("./app/routes/users");
var notesRouter = require("./app/routes/notes");

var app = express();

app.use(helmet());
app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log("Server is Running");
});

module.exports = app;

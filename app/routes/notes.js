var express = require("express");
var router = express.Router();
const withAuth = require("../middlewares/auth");

const NotesController = require("../controllers/NotesController");

router.post("/", withAuth, NotesController.post);

router.get("/search", withAuth, NotesController.search);

router.get("/:id", withAuth, NotesController.getById);

router.get("/", withAuth, NotesController.index);

router.put("/:id", withAuth, NotesController.update);

router.delete("/:id", withAuth, NotesController.delete);

module.exports = router;

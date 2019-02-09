let express = require("express");
let notesController = require("./notes.controller");

const notesRouter = express.Router();

notesRouter.route("/postNotes").post(notesController.createNotes);
notesRouter.route("/allNotes").get(notesController.getNotes);

module.exports = { notesRouter };
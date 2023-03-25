const { addNote, getAllNotes, getNote, updateNote, deleteNote, deleteAllNotes } = require("../controllers/Notes");

const router = require("express").Router();

router.post("/add", addNote);
router.get("/all", getAllNotes);
router.get("/delete/all", deleteAllNotes);
router.get("/delete/:noteId", deleteNote);
router.post("/:noteId", updateNote);
router.get("/one/:noteId", getNote);

module.exports = router;
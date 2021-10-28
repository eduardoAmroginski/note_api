const Note = require("../models/note");

class NotesController {
  async index(req, res) {
    try {
      let notes = await Note.find({ author: req.user._id });
      res.json(notes);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async search(req, res) {
    const { query } = req.query;
    const user = req.user;
    try {
      let notes = await Note.find({ author: user._id }).find({
        $text: { $search: query },
      });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;
      let note = await Note.findById(id);
      if (isOwner(user, note)) {
        res.json(note);
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ error: "Problem to get note" });
    }
  }

  async update(req, res) {
    const { title, body } = req.body;
    const { id } = req.params;
    const user = req.user;

    try {
      let note = await Note.findById(id);
      if (isOwner(user, note)) {
        let note = await Note.findOneAndUpdate(
          id,
          {
            $set: { title: title, body: body },
          },
          { upsert: true, new: true }
        );
        res.json(note);
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ error: "Problem to update note" });
    }
  }

  async post(req, res) {
    const { title, body } = req.body;

    try {
      let note = new Note({ title: title, body: body, author: req.user._id });
      await note.save();
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json({ error: "Problem to create a new note" });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = req.user;

    try {
      let note = await Note.findById(id);
      if (isOwner(user, note)) {
        await note.delete();
        res.json({ message: "Note was deleted" }).status(204);
      } else {
        res.status(403).json({ error: "Permission denied" });
      }
    } catch (error) {
      res.status(500).json({ error: "Problem to delete note" });
    }
  }
}

const isOwner = (user, note) => {
  if (JSON.stringify(user._id) == JSON.stringify(note.author._id)) return true;
  else return false;
};

module.exports = new NotesController();

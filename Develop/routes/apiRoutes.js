const router = require('express').Router();
const store = require('../db/store');

// Gets existing notes from the database
router.get('/notes', (req, res) => {
  store
    .getNotes()
    .then((notes) => {return res.json(notes);})
    .catch((err) => res.status(500).json(err));
});

// Posts notes
router.post('/notes', (req, res) => {
  store
    .writeNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// Deletes notes based on the id
router.delete('/notes/:id', (req, res) => {
  store
    .deleteNotes(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;


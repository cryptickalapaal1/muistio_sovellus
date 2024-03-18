const Note = require('../models/note');

// Hae kaikki muistiinpanot

exports.getAllNotes = async (req, res) => {

try {

const notes = await Note.find();

res.json(notes);

} catch (err) {

console.error(err.message);

res.status(500).send('Server Error');

}

};

// Hae yksittäinen muistiinpano

exports.getNoteById = async (req, res) => {

try {

const note = await Note.findById(req.params.id);

if (!note) {

return res.status(404).json({ msg: 'Note not found' });

}

res.json(note);

} catch (err) {

if (err.kind === 'ObjectId') {

return res.status(404).json({ msg: 'Note not found' });

}

res.status(500).send('Server Error');

}

};

// Luo uusi muistiinpano

exports.createNote = async (req, res) => {

try {

const newNote = new Note({

title: req.body.title,

content: req.body.content

});

const note = await newNote.save();

res.json(note);

} catch (err) {

res.status(500).send('Server Error');

}

};

// Päivitä muistiinpano

exports.updateNote = async (req, res) => {

try {

const { title, content } = req.body;

let note = await Note.findById(req.params.id);

if (!note) {

return res.status(404).json({ msg: 'Note not found' });

}

note = await Note.findByIdAndUpdate(req.params.id, { $set: { title, content } }, { new: true });

res.json(note);

} catch (err) {

if (err.kind === 'ObjectId') {

return res.status(404).json({ msg: 'Note not found' });

}

res.status(500).send('Server Error');

}

};

// Poista muistiinpano

/*

exports.deleteNote = async (req, res) => {

try {

const note = await Note.findById(req.params.id);

//const note = await Note.findByIdAndRemove(req.params.id);

if (!note) {

return res.status(404).json({ msg: 'Note not found' });

}

await note.remove();

res.json({ msg: 'Note removed' });

} catch (err) {

//if (err.kind === 'ObjectId') 
{
    
console.error(err.message);

// return res.status(404).json({ msg: 'Note not found' });

//}

console.error(err.message);

res.status(500).send('Server Error');

}

};

*/

// Poista muistiinpano

exports.deleteNote = async (req, res) => {

try {

const result = await Note.deleteOne({ _id: req.params.id });

if (result.deletedCount === 0) {

return res.status(404).json({ msg: 'Note not found' });

}

res.json({ msg: 'Note removed' });

} catch (err) {

console.error(err.message);

res.status(500).send('Server Error');

}

};
const mongoose =require('mongoose');

const NoteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, 
    },

    content: {
type: String,
required: true,
},
dateCreated: {
type: Date,
default: Date.now,
},

lastModified:{
type: Date,
default: Date.now,
},

});

module.exports = mongoose.model('Note', NoteSchema);
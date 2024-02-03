const express = require('express');
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Route : 1 // 
// Fetch All Notes [ GET ] : "/api/notes".  Req Login

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes)
})

// Route : 2 // 
// Add Notes [ POST ] : "/api/notes".  Req Login

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title !!').notEmpty().isLength({ min: 4 }),
    body('description', 'Describe it properly !!').notEmpty().isLength({ min: 8 })
], async (req, res) => {

    try {
        const { title, description } = req.body;

        // Errors //
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        // Adding New Note //
        const note = new Note({
            title, description, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
    res.status(500).send("AddNote Error Occured");
    }

})

// Route : 3 // 
// Update Notes [ PUT ] : "/api/notes".  Req Login

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description } = req.body;

        // New note Object
        const newNote = {};
        if (title) {newNote.title = title};
        if (description) {newNote.description = description};

        // Find note to update by {id}

        let note = await Note.findById(req.params.id);
        if(!note){ res.status(404).send("Not Found")}

        // Check Wheather the note belongs to the user
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});

    } catch (error) {
        console.error(error.message);
    res.status(500).send("UpdateNote Error Occured");
    }

})

// Route : 4 // 
// Deleting Notes [ DELETE ] : "/api/notes".  Req Login

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description } = req.body;

        // Find note to Delete by {id}

        let note = await Note.findById(req.params.id);
        if(!note){ res.status(404).send("Not Found")}

        // Check Wheather the note belongs to the user
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Deleted":"Note has been Deleted Successfully !!",note:note});

    } catch (error) {
        console.error(error.message);
    res.status(500).send("DeleteNote Error Occured");
    }

})

module.exports = router
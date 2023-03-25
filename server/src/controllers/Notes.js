const Notes = require("../models/Notes");

const addNote = (req, res) => {
    const note = new Notes({
        ...req.body,
        userId: req.user.userId
    });
    note.save().then((data)=>{
        if(data){
            res.status(201).json({
                msg: "Note Added Successfully"
            })
        }else{
            res.status(200).json({
                msg: "Invalid Data"
            })
        }
    }).catch(err=>{
        res.status(200).json({
            msg: "Invalid Data"
        })
    })
}

const getAllNotes = (req, res) => {
    Notes.find({userId: req.user.userId}).then(data=>{
        res.status(200).json(data);
    })
}

const getNote = (req, res) => {
    let flag = true;
    Notes.find({userId: req.user.userId}).then(data=>{
        data.map(notes=>{
            if(notes._id==req.params.noteId){
                res.status(200).json(notes);
                flag = false;
            }
        })
        if(flag){
            res.status(200).json({
                msg: "No such note found"
            })
        }
    })
}

const updateNote = (req, res) => {
    Notes.findByIdAndDelete(req.params.noteId).then((deleted)=>{
        if(deleted){
        const note = new Notes({...req.body, userId:req.user.userId});
        note.save().then(data=>{
            res.status(200).json({
                msg: "Note Updated Successfully"
            })
        })
        }else{
            res.status(200).json({
                msg: "Note not found"
            })
        }
    })        
}

const deleteNote = (req, res) => {
    Notes.findByIdAndDelete(req.params.noteId).then(data=>{
            res.status(200).json({
                msg: "Note Deleted Successfully"
            })
    }).catch(err=>{
        res.status(200).json({
            msg: "Note Deleted Successfully"
        })
    })

}

const deleteAllNotes = (req, res) => {
    Notes.find({userId: req.user.userId}).then(data=>{
        data.map(async(notes)=>{
            await Notes.findByIdAndDelete(notes._id)
        })
        res.status(200).json({
            msg: "All Notes Deleted Successfully"
        })
    }).catch(err=>{
        res.status(200).json({
            msg: "Unauthorized or Session Expired"
        })
    })
}

module.exports = { addNote, getAllNotes, getNote, updateNote, deleteNote, deleteAllNotes };
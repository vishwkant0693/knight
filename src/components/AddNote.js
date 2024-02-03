import React, {useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:""})

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({title:"", description:""})
        props.showAlert("Note Added Successfully !!","Success : ")
    }
    return (
        <>
            <div className="container my-3">
                <h3>Add Note</h3>
                <form action="" className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Note Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} minLength={5} required onChange={onChange} placeholder="Enter Your Note Title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Note Description</label>
                        <textarea className="form-control" id="description" name='description' rows="3" value={note.description} minLength={5} required onChange={onChange} placeholder="Enter Proper Note Description"></textarea>
                    </div>
                </form>
                <button disabled={ note.title.length<5 || note.description.length<5 } className="btn btn-dark" onClick={handleClick}>Add Note</button>
            </div>
        </>
    )
}

export default AddNote
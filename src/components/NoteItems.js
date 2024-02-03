import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItems = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>

            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className='bx bxs-edit' onClick={()=>{updateNote(note)}}></i>
                        <i className='bx bxs-trash-alt mx-3' onClick={()=>{deleteNote(note._id); props.showAlert("Note Deleted Successfully !!","Success : ")}}></i>                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItems
import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from "../context/notes/noteContext";
import NoteItems from './NoteItems';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, fetchNotes, editNote } = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "" });

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes();
    }
    else {
      navigate('/login')
    }
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription)
    refClose.current.click();
    props.showAlert("Account Created Successfully !!","Success : ")
  }


  return (
    <>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Note Title</label>
                  <input type="text" className="form-control" id="title" name='etitle' minLength={5} required value={note.etitle} onChange={onChange} placeholder="Enter Your Note Title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Note Description</label>
                  <textarea className="form-control" id="description" name='edescription' minLength={5} required value={note.edescription} rows="3" onChange={onChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  disabled={note.etitle.length<5 || note.edescription.length<5 } className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h4>Your Notes</h4>
        <div className="container">
          {
            notes.length === 0 && 'No notes to display'
          }
        </div>
        {
          notes.map((note) => {
            return <NoteItems key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
          })
        }
      </div>
    </>
  )
}

export default Notes
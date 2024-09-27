import React from 'react'
import { useContext } from 'react'
import notesContext from '../context/notes/notesContext';

const NoteItem = (props) => {
    const context = useContext(notesContext);
    const {deleteNote} = context
    const {note, updateNote} = props
  return (
    <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <div className='d-flex align-items-center'>
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Notes Deleted!", "danger")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note); }}></i>
                </div>
                <p className="card-text">{note.description}</p>
                
            </div>
        </div>
    </div>
  )
}

export default NoteItem

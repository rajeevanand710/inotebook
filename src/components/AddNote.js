import React, { useState } from 'react'
import { useContext } from 'react'
import notesContext from '../context/notes/notesContext';

const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNote} = context;
    const[note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note added Successfully!", "success")
    }

    const onChange = (e)=> {
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className='container my-3'>
      <h1>Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote

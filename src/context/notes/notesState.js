
import { useState } from "react";
import NotesContext from "./notesContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
    
  const notesInitial =[]

  const [notes, setNotes] = useState(notesInitial)

  //Get all notes
  const getNote = async() => {

  //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
          },
        });


        //Logic
        const json = await response.json()
        // console.log(json)
        setNotes(json)
      }
    
      //Add a note
      const addNote = async(title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
          },
          body: JSON.stringify({title, description, tag})
        });
        // const json = response.json();

        //Logic
        console.log("Adding a new note")
        const note = {
          "_id": "66dfab33e08228bdb41108fd",
          "user": "66de9ec98b57c26b7283d059",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-09-10T02:13:07.207Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }
      //Delete a note
      const deleteNote = async(id) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
          },
        });
        const json = await response.json()
        console.log(json)

        //Logic
        console.log("Deleting the note with id" + id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }

      //Edit a note
      const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = response.json();
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
      
        // Logic
        for(let index = 0; index < notes.length; index++){
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title= title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes);
      }

    return (
        <NotesContext.Provider value = {{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NotesContext.Provider>
    )
  } 

export default NoteState;
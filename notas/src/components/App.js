import React, { useState, useEffect } from "react";
import Note from './Note';
import noteService from '../services/notes'
import Notification from "./Notifications";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage,setErrorMessage]=useState(null)
  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    noteService
    .create(noteObject)
    .then(response=>{
      setNotes(notes.concat(response))
      setNewNote('')
    })
  }

  useEffect(() => {
    noteService
    .getAll()
    .then(response=>{setNotes(response)})
  })

  const noteToShow = showAll ? notes : notes.filter(x => x.important)

  const updateImportance=(id)=>{
    const note= notes.find(x=>x.id===id)
    const note2= {...note,important:!note.important}
    noteService
    .update(id,note2)
    .then(response=>{
      setNotes(notes.map(x=>x.id!==id? x:response))
    })
    .catch(error=>{
      setErrorMessage(`the note ${note2.content} was already existed`)
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
      setNotes(notes.filter(x=>x.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <button onClick={() => setShowAll(!showAll)}>{showAll ? 'Important' : 'All'}</button>
      <ul>
        {noteToShow.map(x => {
          console.log(x.id, x.content);
          return (
            <Note key={x.id} 
            note={x}
            updateImportance={()=>updateImportance(x.id)} />
          )
        })}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit' >Save </button>

      </form>
    </div>
  )

}

export default App
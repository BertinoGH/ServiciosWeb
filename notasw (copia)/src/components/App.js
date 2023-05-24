import React, { useState, useEffect } from "react";
import Note from './Note';
import noteService from '../services/notes'
import Notification from "./Notifications";
import loginService from '../services/login' 

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage,setErrorMessage]=useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
    //.then(response=>{setNotes(response)})
  //})
  .then(initialNotes => {
    setNotes(initialNotes)
  })
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    noteService.setToken(user.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({
      username, password,
    })
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    ) 
    noteService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
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

  const handleNoteChange = (event) => {
    //console.log(event.target.value)
    setNewNote(event.target.value)
  }


  

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <h2>Login</h2>

      {!user && loginForm()} 
      {user && <div>
        <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      } 
      
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
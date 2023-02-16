import React from "react";
import Note from './Note';

const App = ({ notes }) => {
    return (
      <div>
        <h1>Notes</h1>
        <ul>
          {notes.map(x => {
            console.log(x.id, x.content);
            return (
              <Note key={x.id} note={x}/>
            )
          })}
        </ul>
      </div>
    )
  
  }

export default App
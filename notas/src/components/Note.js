import React from "react";

const Note = ({ note, updateImportance }) => {

    
    const label = note.important
        ? "make not important" : "make important"

    return (
        <li className="note">
            {note.content}
            <button onClick={updateImportance}>{label}</button>
        </li>
    )

}
export default Note
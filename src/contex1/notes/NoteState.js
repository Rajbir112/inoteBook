
import { useState,useContext } from "react";
import noteContext from "./noteContext";
import alertContext from "./alertContext";
const NoteState = (props) => {
  let context  = useContext(alertContext);
  let {showAlert} = context;
  const host = "http://localhost:5000";
  let intialNotes = [];
  let [notes, Setnotes] = useState(intialNotes);

  //TO FETCH ALL NOTES
  async function fetchNotes() {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {  // SERVER-ROUTE
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        } // HEADERS SENT FROM BROSER
      });

      const data = await response.json();//CONVERTING DATA IN JSON
      Setnotes(data); // SETING NOTES VALUE AS DATA
    } catch (error) {
      showAlert("warning","note able to fetch the notes pls try again later")
      console.error("Error:", error);
    }
  }

  //ADD A NOTE
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
          title: title,
          description: description,
          tag: tag
        })
      });
      let data = await response.json();
      if (!response.ok) {
        return;
      }
      Setnotes(notes.concat(data));
      showAlert("success"," Note added");
    } catch (error) {
      // Network or other errors
      showAlert("warning",`${error}`)
      console.error("Error deleting note:", error);

    }
  }

  //DELETE A NOTE
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        // Server returned an error status
        const errorData = await response.json();
        console.error("Delete failed:", errorData);
        alert("Failed to delete the note. Please try again.");
        return;
      }
      showAlert("danger"," Note deleted");

      // Update the frontend state
      Setnotes(notes => notes.filter(note => note._id !== id));

    } catch (error) {
      showAlert("warning","some error occured while deleting");
    }
  };


  //EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag
      })
    });
    if (response.ok) {
      const updatedNotes = notes.map(note => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      Setnotes(updatedNotes);
      showAlert("success"," Note is updated");
    }
  }

  return (
    <noteContext.Provider value={{ notes, Setnotes, addNote, editNote, deleteNote, fetchNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;

import React, { useContext, useState } from 'react'
import noteContext from '../contex1/notes/noteContext';
const AddNote = () => {
  let context = useContext(noteContext);
  let { addNote } = context;


  let [note, setNote] = useState({ title: "", tag: "", description: "" });
  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");
    addNote(note.title, note.description, "");
    setNote({ title: "", tag: "default", description: "" })
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div className="container my-3">
        <h2 >Add a Note on rajwinder's iNootBook cloud</h2>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="title">title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} value={note.title}/>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description" >description</label>
            <input type="text" className="form-control" id="description" name="description" placeholder="enter description" onChange={onChange} value={note.description}/ >
          </div>

          <div className="form-group mb-3">
            <label htmlFor="tag" >taq</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="enter tag" value={note.tag} onChange={onChange} />
          </div>

          <button type="submit" disabled={ note.description.length < 5? true: note.title.length < 5? true: false
} className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>

      </div>
    </div>
  )
}

export default AddNote

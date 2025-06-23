import React, { useContext, useEffect, useRef,useState} from 'react'
import noteContext from '../contex1/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes1 = () => {
  let context = useContext(noteContext);
  let navigate = useNavigate();
  let { notes, fetchNotes ,editNote} = context;
  let [note, setNote] = useState({ etitle: "", etag: "default", edescription: "" ,eid: ""});
    useEffect(() => {
    if(localStorage.getItem('token')){
    fetchNotes();
    }
    else
    {
      navigate('/login');
    }
  },[]);
  
  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick=(e)=>{
    console.log("clicked" ,note);
    refClose.current.click();
    editNote(note.eid,note.etitle,note.edescription,note.etag);
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle: currentNote.title ,edescription: currentNote.description,etag: currentNote.tag, eid:currentNote._id});
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  return (
    <div> 
      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">edit note </h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-3">
                  <label htmlFor="etitle">title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle}  name='etitle' aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} minLength={5} required/>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="edescription" >description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" placeholder="enter description"  onChange={onChange}  minLength={5} required/>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="etag" >tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="enter tag" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" disabled={ note.edescription.length < 5? true: note.etitle.length < 5? true: false
}
 onClick={handleClick}>update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2 >Your Notes </h2>
        <div className="container mx-1">
        {notes.length===0&&'add notes to display here'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  )
}

export default Notes1;
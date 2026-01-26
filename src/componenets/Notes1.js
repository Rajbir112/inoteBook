import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import noteContext from '../contex1/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes1 = () => {
  const context = useContext(noteContext);
  const navigate = useNavigate();

  const { notes, fetchNotes, editNote } = context;

  const [note, setNote] = useState({
    etitle: "",
    etag: "default",
    edescription: "",
    eid: ""
  });

  const fetchNotesSafe = useCallback(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchNotesSafe();
    } else {
      navigate('/login');
    }
  }, [fetchNotesSafe, navigate]);

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleClick = () => {
    refClose.current.click();
    editNote(note.eid, note.etitle, note.edescription, note.etag);
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      eid: currentNote._id
    });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />

      <div className="modal fade" id="exampleModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
            </div>

            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                  minLength={5}
                  required
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                  minLength={5}
                  required
                />

                <input
                  type="text"
                  className="form-control"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </form>
            </div>

            <div className="modal-footer">
              <button ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>

              <button
                className="btn btn-primary"
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.length === 0 && 'Add notes to display here'}
        {notes.map((note) => (
          <Noteitem key={note._id} note={note} updateNote={updateNote} />
        ))}
      </div>
    </div>
  );
};

export default Notes1;

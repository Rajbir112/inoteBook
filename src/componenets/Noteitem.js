import React , {useContext}from 'react'
import noteContext from '../contex1/notes/noteContext';
const Noteitem = (props) => {
    const { note,updateNote } = props;
    let context =  useContext(noteContext);
    let {deleteNote} = context;
    const handleDelete = () =>{
        deleteNote(note._id)
    }
    return (
        <div className="col-md-3 ">
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                   <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem

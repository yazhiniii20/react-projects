import {useState,useEffect} from 'react';
import './Notes.css';
function Notes(){
    const[input,setInput] = useState("");
    const[heading,setHeading] = useState("");
    const[note,setNote] = useState(() => {
        const saved = localStorage.getItem("notes");
        return saved ? JSON.parse(saved) : []
    });
    const[editId,setEditId] = useState(null);
    useEffect(() => {
        localStorage.setItem("notes",JSON.stringify(note))
},[note]);
 
    function addNote(input,heading){
        if(input.trim() === ""){
            return;
        }
       const newNote = {
        id : Date.now(),
        dateCreated : new Date().toLocaleString(),
        noteheading : heading,
        contents : input
       }
       setNote([...note,newNote]);
       setHeading("");
       setInput("");
    }
    function deleteNote(id){
        setNote(note.filter(n => n.id !== id));
        if(id === editId){
            setEditId(null);
            setInput("");
            setHeading("");
          }
    }
    function editNote(id,contents,heading){
        setEditId(id);
        setInput(contents);
        setHeading(heading);

    }
    function updateNote(){
        const updatedNotes = note.map(
            n => {
                if(n.id === editId){
                    return{
                        ...n,
                        dateCreated : new Date().toLocaleString(),
                        contents:input,
                        noteheading:heading
                    };
                }else{
                    return n;
                }
            }
        )
        setNote(updatedNotes);
        setEditId(null);
        setInput("");
        setHeading("");
    }
    function cancelNote(){
        setEditId(null);
        setInput("");
        setHeading("");
    }
    return(
        <div className = "notes">
          <div className="notes-input">
          <input type="text" className = "heading-input" value = {heading} placeholder = "Heading" onChange = {(e) => setHeading(e.target.value)}/><br></br>
          <input type="text" className = "note-input" value = {input} onChange = {(e) => setInput(e.target.value)}/> <br></br>
          {editId === null ? (<button className = "add-btn" onClick = {() => addNote(input,heading)}> Add </button>) : 
          (
          <div>
          <button className = "add-btn" onClick = {() => updateNote()}> Update </button>
          <button className = "cancel-btn" onClick = {cancelNote}> Cancel </button>
          </div>
          )
          }
          </div>
          <div className = "notes-grid">
             {note.map(n => 
             <div className ="notes-list" key={n.id}>
                <h3> {n.noteheading}</h3>
                <p className = "date"> Last Changes : {n.dateCreated} </p>
                <p className = "contents"> {n.contents} </p>
                <button className = "delete-btn" onClick = {() => deleteNote(n.id)}> Delete </button>
                <button className = "edit-btn" onClick = {() => editNote(n.id,n.contents,n.noteheading)}>Edit</button>
            </div>
            )}
            </div>
        </div>
    );
}
export default Notes;
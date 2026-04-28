import './Notes.css';
function NoteList({notes,deleteNote,startEdit,setSelectedTag,togglePinnedNotes}){
return(
<div className = "notes-grid">
    {notes.length === 0 ? (<div><p>No notes found. Start by adding one!</p></div>):(
    <>
    {notes.map(note => 
        <div className={`notes-list ${note.pinned ? "pinned" : ""}`} key = {note.id}>
            <div>
            <div className="card-header">
            <div className = "tags">
                {note.tags.map((tag,index) => (
                    <span key={index} className="tag" onClick={()=>setSelectedTag(tag)}>
                      {tag}
                    </span>
                ))}
            </div>
              <button className="pin-btn" onClick = {() => togglePinnedNotes(note.id)}>{note.pinned ? "Unpin📌" : "Pin📌"}</button>
              </div>
            <h3> {note.heading} </h3>
            <p>  {note.contents} </p>
            <p>  Last Changes on : {note.createdAt} </p>
            </div>
            <div className="button-grp">
            <button className = "delete-btn" onClick={() => deleteNote(note.id)}>Delete</button>
            <button className = "edit-btn" onClick={() => startEdit(note)}>Edit</button>
            </div>
        </div>
    )}
    </>
    )}
</div>
);
}
export default NoteList;
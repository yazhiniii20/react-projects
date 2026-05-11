import {useState,useEffect} from 'react';
import NoteForm from './NoteForm.js';
import NoteList from './NoteList.js';
import './Notes.css'
function KnowledgeHub(){
 const [notes, setNotes] = useState([]);
 const [loading,setLoading] = useState(false);
 const [error , setError] = useState("");
 useEffect(() => {
    setLoading(true);
    setError("");
    fetch("http://localhost:5000/notes")
      .then(res =>{
        if (!res.ok) throw new Error("Failed to fetch notes");
        return res.json();
      })
      .then(data => {
        setNotes(Array.isArray(data) ? data : []);
      })
      .catch(err =>{
        setError(err.message);
        setNotes([]);
      })
      .finally(()=>{
        setLoading(false);
      })
  }, []);
 const [input,setInput] = useState("");
 const [title,setTitle] = useState("");
 const [editId,setEditId] = useState(null);
 const [search,setSearch] = useState("");
 const [tagInput,setTagInput] = useState("");
 const [tags,setTags] = useState([]);
 const[selectedTag,setSelectedTag] = useState("");
 
 function addNote(){
    if(input.trim() === ""){
        return;
    }
    const newNote = {
        heading : title,
        contents : input,
        tags : tags,
        pinned : false,
        createdAt : new Date().toLocaleString(),
        updatedAt : ""
    };
    fetch("http://localhost:5000/notes",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(newNote)
    })
    .then(res => {
        if(!res.ok){
            throw new Error("Failed to add note");
        }
        return res.json();
    })
    .then(data => setNotes(prev => [...prev, data]))
    .catch(err => setError(err.message))
    .finally(()=> setLoading(false));
    setTitle("");
    setInput("");
    setTags([]);
}
function deleteNote(id){
    fetch(`http://localhost:5000/notes/${id}`,{
        method : "DELETE"
    }).then(res => {
        if(!res.ok) throw new Error("Failed to delete note");
        setNotes(prev => prev.filter(n => n._id !== id));
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}
function startEdit(note){
    setEditId(note._id);
    setTitle(note.heading);
    setInput(note.contents);
    setTags(note.tags || []);
}
function updateNote(){
    const updated = {
            heading : title,
            contents : input,
            tags : tags,
            updatedAt : new Date().toLocaleString()
    }
    fetch(`http://localhost:5000/notes/${editId}`,{
    method : "PUT",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(updated)
    }).then(res => {
        if(!res.ok) throw new Error("Failed to update notes");
        setNotes(prev =>
            prev.map(n =>
              n._id === editId ? { ...n, ...updated } : n
            )
          );
    })
    .catch(err => setError(err.message))
    .finally(()=> setLoading(false));
    setEditId(null);
    setTitle("");
    setInput("");
    setTags([]);
}
function cancelNote(){
    setTitle("");
    setInput("");
    setEditId(null);
}
const filteredNotes = (notes || []).filter(n =>{
  const matchesSearch = n.heading.toLowerCase().includes(search.toLowerCase()) ||
                        n.contents.toLowerCase().includes(search.toLowerCase());
 
  const matchesTag = selectedTag === "" || n.tags.some(tag => tag === selectedTag);
  return matchesSearch && matchesTag;
});
const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (b.pinned !== a.pinned) {
        return b.pinned - a.pinned;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
  });
const pinnedNotes = sortedNotes.filter(note => note.pinned);
const otherNotes = sortedNotes.filter(note => !note.pinned);
  function togglePinnedNotes(id) {
    const targetNote = notes.find(n => n._id === id);
      if (!targetNote) return;  
    const updatedPinned = !targetNote.pinned;  
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pinned: updatedPinned
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to update pin");
        }
  
        setNotes(prev =>
          prev.map(n =>
            n._id === id
              ? { ...n, pinned: updatedPinned }
              : n
          )
        );
      })
      .catch(err => setError(err.message));
  }
 function clearInput(){
    setTitle("");
    setInput("");
    setEditId(null);
    setTagInput("");
    setTags([]);
 }
 function removeTag(indexToRemove){
    setTags(tags.filter((_, index) => index !== indexToRemove));
}
return(
    <div>
    <div className = "header">
    <h1 className="app-name"> Personal Knowledge Hub </h1>
    <input type="text" value = {search} className = "search-input" placeholder = "Search Notes..." onChange = {(e) => setSearch(e.target.value)}/>
    </div>
    {error && <p className="error">{error}</p>}
    {loading ?(<p className="status">Loading...</p>):(
    <>
    <NoteForm addNote = {addNote} input = {input} setInput = {setInput} title = {title} setTitle = {setTitle}
    editId = {editId} updateNote = {updateNote} cancelNote = {cancelNote} tagInput={tagInput} setTagInput = {setTagInput} tags={tags} setTags={setTags}
    selectedTag = {selectedTag} setSelectedTag={setSelectedTag} clearInput={clearInput} removeTag={removeTag}/>
    {pinnedNotes.length > 0 &&(
      <>
       <h2 className="section-title">📌 Pinned Notes</h2>
       <NoteList notes = {pinnedNotes} deleteNote = {deleteNote} startEdit = {startEdit} setSelectedTag = {setSelectedTag}
    togglePinnedNotes = {togglePinnedNotes}/>
      </>
   )}
   <h2 className="section-title">📝 Other Notes</h2>
    <NoteList notes = {otherNotes} deleteNote = {deleteNote} startEdit = {startEdit} setSelectedTag = {setSelectedTag}
    togglePinnedNotes = {togglePinnedNotes}/>
    </>)}
    </div>
);
}
export default KnowledgeHub;
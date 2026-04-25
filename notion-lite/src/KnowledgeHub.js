import {useState,useEffect} from 'react';
import NoteForm from './NoteForm.js';
import NoteList from './NoteList.js';
import './Notes.css'
function KnowledgeHub(){
    const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
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
        id : Date.now(),
        heading : title,
        contents : input,
        tags : tags,
        pinned : false,
        createdAt : new Date().toLocaleString(),
        updatedAt : ""
    }
    setNotes([...notes,newNote]);
    setTitle("");
    setInput("");
    setTags([]);
}
function deleteNote(id){
    setNotes(notes.filter(n => n.id !== id));
}
function startEdit(note){
    setEditId(note.id);
    setTitle(note.heading);
    setInput(note.contents);
}
function updateNote(){
    const updated = notes.map(n =>{
        if(n.id === editId){
            return {
                ...n,
                heading : title,
                contents : input,
                updatedAt : new Date().toLocaleString()
            }
        }
        return n;
    });
    setNotes(updated);
    setEditId(null);
    setTitle("");
    setInput("");
}
function cancelNote(){
    setTitle("");
    setInput("");
    setEditId(null);
}
const filteredNotes = notes.filter(n =>{
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
 function togglePinnedNotes(id){
 const pinnedNote = notes.map(n => {
    if(n.id === id){
        return{
        ...n,
        pinned : !n.pinned
        };
    }
    return n;
  });
 setNotes(pinnedNote);
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
    <NoteForm addNote = {addNote} input = {input} setInput = {setInput} title = {title} setTitle = {setTitle}
    editId = {editId} updateNote = {updateNote} cancelNote = {cancelNote} tagInput={tagInput} setTagInput = {setTagInput} tags={tags} setTags={setTags}
    selectedTag = {selectedTag} setSelectedTag={setSelectedTag} clearInput={clearInput} removeTag={removeTag}/>
    <NoteList notes = {sortedNotes} deleteNote = {deleteNote} startEdit = {startEdit} setSelectedTag = {setSelectedTag}
    togglePinnedNotes = {togglePinnedNotes}/>
    </div>
);
}
export default KnowledgeHub;
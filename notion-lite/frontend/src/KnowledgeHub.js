import {useState,useEffect} from 'react';
import NoteForm from './NoteForm.js';
import NoteList from './NoteList.js';
import { useNotes } from "./hooks/useNotes";
import './Notes.css'

function KnowledgeHub(){
 const {notes,loading,error,fetchNotes,addNote:addNoteAPI,deleteNote: deleteNoteHook,updateNote: updateNoteHook,togglePin} = useNotes();
//  const {user} = useAuth();
//  const navigate = useNavigate();

 useEffect(() => {
  fetchNotes();
},[fetchNotes]);

 const [input,setInput] = useState("");
 const [title,setTitle] = useState(""); 
 const [search,setSearch] = useState("");
 const [tags,setTags] = useState([]);
 const [editId,setEditId] = useState(null);
 const [tagInput,setTagInput] = useState("");
 const[selectedTag,setSelectedTag] = useState("");

 async function addNote(){
  if(input.trim() === ""){
      return;
  }
  const newNote = {
      heading: title,
      contents: input,
      tags: tags,
      pinned: false,
      createdAt: new Date().toLocaleString(),
      updatedAt: ""
  };
  const success =  await addNoteAPI(newNote);

  if(success){
      setTitle("");
      setInput("");
      setTags([]);
  }
}

async function deleteNote(id){

  await deleteNoteHook(id);
}

function startEdit(note){
    setEditId(note._id);
    setTitle(note.heading);
    setInput(note.contents);
    setTags(note.tags || []);
}

async function updateNote(){
  const updated = {
      heading: title,
      contents: input,
      tags: tags,
      updatedAt: new Date().toLocaleString()
  };
  const success =  await updateNoteHook(editId, updated);
  if(success){
      setEditId(null);
      setTitle("");
      setInput("");
      setTags([]);
  }
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

async function togglePinnedNotes(id){
  await togglePin(id);
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

// function handlelogout(){
//   logout();
//   navigate("/login");
// }

return(
    <div>
    <div className = "header">
    <input type="text" value = {search} className = "search-input" placeholder = "Search Notes..." onChange = {(e) => setSearch(e.target.value)}/>
    {/* <button onClick={handlelogout}>Logout</button> */}
    </div>
    {error && <p className="error">{error}</p>}
    {loading ?(<p className="status">Loading...</p>):(
    <>
    {/* <h3 className="user-name-heading"> Welcome, {user?.username}</h3> */}
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
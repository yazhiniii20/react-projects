import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import NoteForm from './NoteForm.js';
import NoteList from './NoteList.js';
import {getNotes,createNote,updateNote as updateNoteAPI,deleteNote as deleteNoteAPI} from "./services/api";
import {useAuth} from "./context/AuthContext";
import './Notes.css'

function KnowledgeHub(){
 const [notes, setNotes] = useState([]);
 const [loading,setLoading] = useState(false);
 const [error , setError] = useState("");
 const { token,logout } = useAuth();
 const navigate = useNavigate();

 useEffect(() => {
  async function fetchNotes(){
      try{
          setLoading(true);
          setError("");
          const data = await getNotes();
          setNotes(Array.isArray(data) ? data : []);
      } catch(error){
          setError("Failed to fetch notes");
          setNotes([]);
      } finally{
          setLoading(false);
      }
  }
  fetchNotes();
}, []);

 const [input,setInput] = useState("");
 const [title,setTitle] = useState("");
 const [editId,setEditId] = useState(null);
 const [search,setSearch] = useState("");
 const [tagInput,setTagInput] = useState("");
 const [tags,setTags] = useState([]);
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
  try{
      setLoading(true);
      const savedNote = await createNote(newNote);
      setNotes(prev => [...prev, savedNote]);
      setTitle("");
      setInput("");
      setTags([]);
  } catch(error){
      setError("Failed to add note");
  } finally{
      setLoading(false);
  }
}

async function deleteNote(id){
  try{
      setLoading(true);
      await deleteNoteAPI(id);
      setNotes(prev => prev.filter(n => n._id !== id));
  } catch(error){
      setError("Failed to delete note");
  } finally{
      setLoading(false);
  }
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
  try{
      setLoading(true);
      const updatedNote =  await updateNoteAPI(editId, updated);
      setNotes(prev => prev.map(n => n._id === editId ? updatedNote : n));
      setEditId(null);
      setTitle("");
      setInput("");
      setTags([]);
  } catch(error){
      setError("Failed to update note");
  } finally{
      setLoading(false);
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

  function togglePinnedNotes(id) {
    const targetNote = notes.find(n => n._id === id);
      if (!targetNote) return;  
    const updatedPinned = !targetNote.pinned;  
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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

function handlelogout(){
  logout();
  navigate("/login");
}

return(
    <div>
    <div className = "header">
    <h1 className="app-name"> Personal Knowledge Hub </h1>
    <input type="text" value = {search} className = "search-input" placeholder = "Search Notes..." onChange = {(e) => setSearch(e.target.value)}/>
    <button onClick={handlelogout}>Logout</button>
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
import './Notes.css';
function NoteForm({addNote,input,setInput,title,setTitle,editId,updateNote,cancelNote,
  tagInput,setTagInput,tags,setTags,selectedTag,setSelectedTag,clearInput,removeTag}){
return(
    <>
    {selectedTag && (
        <button className = "clear-tag-filter" onClick={() => setSelectedTag("")}> Clear Filter </button> )}
    <div className = "input-form">
    <div className = "input-container">
    <input type="text" className="title-input" placeholder = "Heading..." value = {title} onChange={(e) => setTitle(e.target.value)}/>
    <input type="text" className="note-input" value = {input} onChange={(e) => setInput(e.target.value)}/>
    </div>
    <div className="tags">
    <input type="text" value = {tagInput} className = "tag-input" placeholder = "Add tag and press enter" onChange = {(e) => setTagInput(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter" && tagInput&&tagInput.trim() !== "") {
          e.preventDefault();
          console.log(tagInput);
          if (!tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
          }
          setTagInput("");
        }
      }}/>
      </div>
      <div className="tags-list">
      {tags.map((tag,index) => (
                    <span key={index} className="tag">
                {tag} <span clasName="remove-tag" onClick={() => removeTag(index)}>❌</span>
                    </span>
                ))}
      </div>
    {editId === null ?(<div><button className = "add-btn" onClick={()=> addNote()}>Add</button> 
    <button className = "clear-btn" onClick={()=> clearInput()}>Clear</button> 
    </div>):
    (
    <>
    <button className = "update-btn" onClick={()=>updateNote()}>Update</button>
    <button className = "cancel-btn" onClick={()=>cancelNote()}>Cancel</button>
    </>)}
    </div>
    </>
);
}
export default NoteForm;
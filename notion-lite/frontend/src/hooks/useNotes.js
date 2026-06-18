import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getNotes, createNote, updateNote as updateNoteAPI, deleteNote as deleteNoteAPI} from "../services/api";

export function useNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const fetchNotes = useCallback(async () => {
        try{
            setLoading(true);
            setError("");    
            const data = await getNotes();    
            setNotes(Array.isArray(data) ? data : []);
        }
        catch(error){
            setError("Failed to fetch notes");
            setNotes([]);
        }
        finally{
            setLoading(false);
        }
    }, []);

    async function addNote(newNote){       
        try{
            setLoading(true);
            setError("");
            const savedNote = await createNote(newNote);
            setNotes(prev => [...prev, savedNote]);
            toast.success("Note added");
            return true;
        } catch(error){
            setError("Failed to add note");
            toast.error("Failed to add note");
            return false;
        } finally{
            setLoading(false);
        }
      }   

      async function deleteNote(id){
        try{    
            setLoading(true);    
            setError("");    
            await deleteNoteAPI(id);    
            setNotes(prev =>
                prev.filter(n => n._id !== id)
            );
            toast.success("Note deleted");   
            return true;    
        } catch(error){    
            setError("Failed to delete note"); 
            toast.error("Failed to delete note");   
            return false;    
        } finally{    
            setLoading(false);
        }
    }

    async function updateNote(id, updatedData){
        try{    
            setLoading(true);    
            setError("");    
            const updatedNote =  await updateNoteAPI(id, updatedData);    
            setNotes(prev =>  prev.map(n => n._id === id ? updatedNote : n));
            toast.success("Note updated");    
            return true;    
        } catch(error){    
            setError("Failed to update note");    
            toast.error("Failed to update note");
            return false;    
        } finally{    
            setLoading(false);
        }
    }

    async function togglePin(id){
        try{    
            setLoading(true);    
            setError("");    
            const targetNote = notes.find(n => n._id === id);    
            if(!targetNote){
                return false;
            }    
            const updatedPinned = !targetNote.pinned;    
            const updatedNote =  await updateNoteAPI(id, {pinned: updatedPinned});    
            setNotes(prev => prev.map(n => n._id === id ? updatedNote : n));    
            return true;    
        } catch(error){    
            setError("Failed to update pin");    
            return false;    
        } finally{    
            setLoading(false);
        }
    }

    return { notes, setNotes, loading, error,fetchNotes,setLoading,setError,addNote,deleteNote,updateNote,togglePin};
}
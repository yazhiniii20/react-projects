const BASE_URL = process.env.REACT_APP_API_URL?.replace(/\/$/, "");
function getToken(){
    return localStorage.getItem("token");
}
console.log("BASE_URL =", BASE_URL);
export async function loginUser(userData){
    const response = await fetch(
        `${BASE_URL}/auth/login`,
         {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );
    return response.json();
}

export async function registerUser(userData){
    const response = await fetch(
        `${BASE_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );
    return response.json();
}

function authHeaders(){
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
    };
}

export async function getNotes(){
    const response = await fetch(
        `${BASE_URL}/notes`,        {
            headers: authHeaders()
        }
    );
    return response.json();
}

export async function createNote(noteData){
    const response = await fetch(
        `${BASE_URL}/notes`,        {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify(noteData)
        }
    );
    return response.json();
}

export async function updateNote(id, updatedData){
    const response = await fetch(
        `${BASE_URL}/notes/${id}`,        {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify(updatedData)
        }
    );
    return response.json();
}

export async function deleteNote(id){
    const response = await fetch(
        `${BASE_URL}/notes/${id}`,
        {
            method: "DELETE",
            headers: authHeaders()
        }
    );
    return response.json();
}

export async function getStats() {
    const response =  await fetch(`${BASE_URL}/notes/stats`,{
                headers: authHeaders()
            }
        );
    return response.json();
}
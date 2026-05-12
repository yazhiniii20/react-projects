import './App.css';
import {useState} from 'react';
import Login from "./components/auth/Login";
import KnowledgeHub from './KnowledgeHub.js'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  return (
    <div className="App">
      {
   isLoggedIn ? (
      <KnowledgeHub setIsLoggedIn={setIsLoggedIn} />
   ) : (
      <Login setIsLoggedIn={setIsLoggedIn} />
   )
}
    </div>
  );
}

export default App;

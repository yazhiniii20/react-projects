import './App.css';
import {useState} from 'react';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import KnowledgeHub from './KnowledgeHub.js'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="App">
  {
  isLoggedIn ? (<KnowledgeHub setIsLoggedIn={setIsLoggedIn} />
  ) : ( showLogin ? (<Login setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin}/>
    ) : (<Register setShowLogin={setShowLogin}/> )
  )
}    </div>
  );
}

export default App;

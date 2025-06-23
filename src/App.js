
import './App.css';
import { 
    BrowserRouter as Router,
    Routes,
    Route,
 } from "react-router-dom";
import Navbar from './componenets/Navbar';
import Home from './componenets/Home';
import Aboout from './componenets/Aboout';
import NoteState from './contex1/notes/NoteState'; 
import Login from './componenets/Login';
import Signup from './componenets/Signup';
import Alert from './componenets/Alert';
import AlertState from './contex1/notes/AlertState';
function App() {
  return (
    <>  
       <AlertState>
      <NoteState>
      <Router>
      <Navbar/>
      <Alert/>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<Aboout />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<Signup/>} />
        </Routes>
      </div>
        </Router>
        </NoteState>
        </AlertState>
    </> 
  );
}

export default App;

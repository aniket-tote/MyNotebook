import HeadNavbar from "./components/HeadNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Addnote from "./components/Addnote";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <div className="App">
      <NoteState>
        <Router>
          <HeadNavbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/addnote" element={<Addnote />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;

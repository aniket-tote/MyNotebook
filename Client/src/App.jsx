import HeadNavbar from "./components/HeadNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex className="App" flexDirection={"column"}>
      <NoteState>
        <Router>
          <HeadNavbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </Flex>
  );
}

export default App;

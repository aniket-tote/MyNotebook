import HeadNavbar from "./components/HeadNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Flex } from "@chakra-ui/react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Flex className="App" flexDirection={"column"}>
      <NoteState>
        <Router>
          <HeadNavbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/addnote" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/forgotpassword" element={<ForgotPassword />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </Flex>
  );
}

export default App;

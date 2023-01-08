import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const a = useContext(noteContext);

  return <div>This is add note page</div>;
};

export default Addnote;

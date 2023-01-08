import NoteContext from "./noteContext";
import React from "react";

const NoteState = (props) => {
  const state = {
    name: "ani",
  };
  // const [state, setState] = useState(s1);
  // const update = (param) => { change parent state from chidren
  //   setState(param);
  // };
  return (
    <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;

import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = ({ children }) => {
  const [name,setName]=useState('Dashboard')

  return (
    <NoteContext.Provider
      value={{name,setName}}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
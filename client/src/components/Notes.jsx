import React , {useState , useEffect} from "react";
import Container from "./Pagination";
import axios from "axios";

const Notes= ()  => {

  return (
    <div className="NoteContainer">
      <Container  itemsPerPage={5} />
    </div>
  );
}

export default Notes;
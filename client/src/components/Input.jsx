import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React ,{Component, useEffect, useState} from 'react'
import axios from 'axios';
import Dashboard from '../pages/Dashboard';

const CreateNote =() =>  {
  const [content, setContent] = useState("");
  const [status , setStatus] = useState(false)
  const token = localStorage.getItem("token");
  const handleNoteCreate = (e) => {
    e.preventDefault();
  const note = { content };

  axios({
      method: "POST",
      url: `http://127.0.0.1:9000/api/v1/note/create`,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      data: note,
  }).then(() => {
      console.log("New Note Added");
      window.location.reload(true)
  });
  
 }

  return (
    <div className='createForm'>
    <Form >
        <Form.Group className="mb-3">
          <Form.Label >Create New note</Form.Label>
          <Form.Control  onChange={(e) => setContent(e.target.value)}/>
        </Form.Group>
       
        <Button onClick={handleNoteCreate} type="submit">Submit</Button>
   
    </Form>
    </div>
  );
}

export default CreateNote;
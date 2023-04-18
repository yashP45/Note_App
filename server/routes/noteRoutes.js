import express from 'express'
import auth from "./../auth.js"
import { createNote  , getNote, getSingleNote , deleteNote} from '../controllers/noteController.js';
const Noterouter = new express.Router();

Noterouter.post("/create" , createNote )
Noterouter.get("/getNotes" , getNote )
Noterouter.get("/getNote/:id" , getSingleNote )
Noterouter.delete("/delete/:id" , deleteNote )

export default Noterouter
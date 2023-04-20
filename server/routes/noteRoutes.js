import express from 'express'
import auth from "./../auth.js"
import { createNote  , getNote, deleteNote} from '../controllers/noteController.js';
const Noterouter = new express.Router();

Noterouter.post("/create" ,auth, createNote )
Noterouter.get("/getNotes" ,auth , getNote )
Noterouter.delete("/delete/:id" ,auth , deleteNote )

export default Noterouter
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbarr = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        const token = localStorage.getItem("token")
          console.log(token)
       axios({
        url: "http://127.0.0.1:9000/api/v1/auth/logout",
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
       }).then( async (res) =>  {
        console.log("logged out")
        const isTokenExists = await localStorage.getItem("token");
        if (isTokenExists) {
            localStorage.removeItem("token");
            navigate("/");
        }
        }
       ).catch((err) => {
        alert(err);
    });
    }
  
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Note-app</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="justify-content-end">
                        <Button
                            style={{ backgroundColor: "red", border: "none" , margin: 10 }}
                            variant="primary"
                            onClick={ handleSignOut}
                        >
                            Logout
                        </Button>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbarr

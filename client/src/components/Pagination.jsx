import React, { useState , useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
const  Container =({ itemsPerPage })  => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setNotes] = useState([]);
  const getNotes = () => {
    const token = localStorage.getItem("token");
    axios
    .get(`http://127.0.0.1:9000/api/v1/note/getNotes`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
        setNotes(res.data);
    })
    .catch((err) => {
        console.log(err.message);
    });
  }
 
  useEffect(() => {
    getNotes();
  }, [setNotes])
  
  console.log(items)
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  
  const handleDelete = () => {
    console.log("deleted")
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [items, itemsPerPage]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}  >
          <button className={` pagination-item ${i === currentPage ? "active" : ""}`} onClick={() => goToPage(i)}>{i}</button>
        </li>
      );
    }
    return <ul className="pagination">{pageNumbers}</ul>;
  };

  return (
    <>
    <div className="containerrow">
      {currentItems.map((item, index) => (
        <div key={index} >
          <div className="yash">
          <p>{item.content} </p>
          <Button className="deleteBtn" onClick={handleDelete}>Delete</Button>
          </div>
        </div>
      ))}
     
    </div>
    {renderPagination()}
    </>
  );
}

export default Container;

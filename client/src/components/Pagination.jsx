import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";



const Container = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setNotes] = useState([]);
 

  // --------------pagination Setup ---------
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
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
  // ---- Fetching notes --------
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


  //------------- Function to delete notes ---------
  const handleDelete = (_id) => {
    const token = localStorage.getItem("token");
    axios({
      url: `http://127.0.0.1:9000/api/v1/note/delete/${_id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      window.location.reload(true)
    }

    );
  }

  return (
    <>
      <div className="containerrow">
        {!items ||
          (items.length == 0 && (
            <h3>No Notes Found</h3>
          ))}
        {currentItems.map((item, index) => (
          <div className="box" key={index} >
            <div className="noteBox">
              <p className="text"> {item.content} </p>
              <Button className="deleteBtn" onClick={() => handleDelete(item._id)}>Delete</Button>
            </div>
          </div>
        ))}
        {renderPagination()}
      </div>

    </>
  );
}

export default Container;

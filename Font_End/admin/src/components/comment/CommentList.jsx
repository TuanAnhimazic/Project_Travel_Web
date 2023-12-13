import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import "./commentlist.scss";

const CommentList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [commentsPerPage] = useState(3); // Adjust the number per page as needed

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://localhost:7249/api/MComment/getReview')
      .then((result) => {
        // Sort the data by rating initially
        const sortedData = result.data.data.sort((a, b) => b.rating - a.rating);
        setData(sortedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const handleDeleteComment = (commentId) => {
    axios
      .delete(`https://localhost:7249/api/MComment/deleteReview/${commentId}`)
      .then(() => {
        // Cập nhật trạng thái để loại bỏ bình luận đã xóa
        const updatedComments = data.filter(comment => comment.id !== commentId);
        setData(updatedComments);
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };
  
  // Change page
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Calculate the comments to be displayed on the current page
  const currentComments = data.slice(
    currentPage * commentsPerPage,
    (currentPage + 1) * commentsPerPage
  );

  // Sort by Rating
  const sortByRating = (rating) => {
    const sortedData = [...data].sort((a, b) => {
      if (rating === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    setData(sortedData);
  };

  return (
    <div  className="comment-list-container">
      {/* Rating Sort Buttons */}
      <div className="sort-buttons">
      <button onClick={() => sortByRating('asc')}> Reviews(1⭐-3⭐)</button>
      <button onClick={() => sortByRating('desc')}> Reviews(4⭐-5⭐)</button>
      </div>
      {/* Paginated Comments */}
      {currentComments.map((comment) => (
        <div key={comment.id} className="comment">
          <div className="comment-content">
            <p>Stay: {comment.stay.title}</p>
          </div>
          <div className="user-info">
            <div className="user-name">Name User: {comment.user.fullName}</div>
          </div>
          <div className="comment-content">
            <p>Comment: {comment.comment}</p>
          </div>
          <div className="comment-rating">
            <span>Rating {comment.rating}⭐</span>
          </div>
          <div className="comment-date">
            <span>Date: {new Date(comment.dateCreated).toLocaleString()}</span>
          </div>
          <button onClick={() => handleDeleteComment(comment.id)} className="delete-button">Delete</button>
        </div>
         
      ))}

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={'back'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={Math.ceil(data.length / commentsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        
      />
    </div>
  );
};

export default CommentList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom"

const StayCard = () => {
  const [data, setData] = useState([]);
  // Thêm state cho trang hiện tại và số lượng items mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1);
 
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get('https://localhost:7249/api/Stay/GetListStay')
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
  }
  //Xác định số trang
  const totalPages = Math.ceil(data.length / itemsPerPage);
 

  return (
  <>
   <Link to="/stay" style={{ textDecoration: "none"}}>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        
      {data.map((stay) => (
       
       <Card key={stay.id} style={{ 
        maxWidth: 350,
        margin: '10px', // This adds space around each card
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Example of a subtle shadow
        height: '360px'
      }}>
          <CardMedia
            component="img"
            height="90"
            image={`https://localhost:7249/Images/${stay.featuredImage}`}
            alt={stay.title}
          />
          <CardContent>
          <Typography variant="body2" color="text.secondary">
              {stay.category?.rentalform} - {stay.maxGuest} beds
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {stay.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stay.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stay.description}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {stay.price?.basePrice || 'N/A'} {stay.price?.currency }
            </Typography>
          </CardContent>
        </Card>
       
      ))}
    </div>
    </Link>

    </>
  );
};
export default StayCard;


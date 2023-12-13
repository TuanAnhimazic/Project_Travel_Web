import "./viewdetail.scss";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
//import TodayIcon from '@mui/icons-material/Today';
//import CategoryIcon from '@mui/icons-material/Category';
import { useParams} from "react-router-dom";
//import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ViewDetail = () => {
  const [stayDetails, setStayDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7249/api/MStay/GetStayById/${id}`);
        setStayDetails(response.data.data); // Adjust according to your API response
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stayDetails) {
    return <div>No stay details found.</div>;
  }

  // Assuming stayDetails is structured as per your API response
  return (
    <div className="stay-details">
       {/* To display gallery images if any */}
       {stayDetails.galleryImgs?.length > 0 && (
        <div className="gallery">
         
          <h3>Gallery</h3>
          {stayDetails.galleryImgs.map((img) => (
            <img key={img.id} src={`https://localhost:7249/Images/${img.listImage}`} alt="Gallery" />
          ))}
        </div>
      )}
      <h2 className="title"> <HomeTwoToneIcon/> {stayDetails.title}</h2>
      <p className="description"><DescriptionTwoToneIcon/>Description: {stayDetails.description}</p>
      <div className="address">
        <strong><LoyaltyTwoToneIcon/> Address:</strong> {stayDetails.location?.street}, {stayDetails.location?.city}
      </div>
      {/* Render other details similarly */}
      <div className="price">
        <strong><MonetizationOnIcon/>Price:</strong> {stayDetails.price?.basePrice} {stayDetails.price?.currency}
      </div>
      {/* ... */}
     
    </div>
  );
};

export default ViewDetail;


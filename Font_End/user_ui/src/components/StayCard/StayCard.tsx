import React, { FC, useState } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import StartRating from "components/StartRating/StartRating";
import { Link, useNavigate } from "react-router-dom";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import { StayData } from "data/types";
import { PostLike_API } from "API/Stay/StayLike";
import { useAuth } from "containers/AuthContext/AuthContext";

export interface StayCardProps {
  className?: string;
  data?: StayData;
  size?: "default" | "small";
}


const StayCard: FC<StayCardProps> = ({
  size = "default",
  className = "",
  data = {} as StayData,
}) => {

  const{ user } = useAuth();
  const router = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [likeSuccess, setLikeSuccess] = useState(false);

  if (!data.id) return <div>No data available</div>;
  const {
    id,
    category,
    href = data.id ? `/listing-stay-detail/${id}` : "/listing-stay-detail",
    title,
    address,
    reviewStart,
    reviewCount,
    like,
    maxBedroom,
    galleryImgs,
    price,
    saleOff,
   
  } = data;

 
  const handleLikeChange = async (newLikedState: boolean) => {

    const authorId = user ? user.id : null;

    if(!user || !authorId){
      console.log("User is not logged in. Redirect to login page.");
      setShowLoginModal(true);
     
      return;
    }

    // Thực hiện xử lý dữ liệu khi trạng thái like thay đổi
   
    const posLikeData = {
      userId: authorId,
      stayId: id,
      islike: newLikedState
    }
    console.log(" posLikeData:", posLikeData);
    
    try{
      const response = await PostLike_API(posLikeData);
      const result:{success: boolean, message: string, data: any} = response.data;

      if(result.success){
        console.log(" Post like :", result.message);
        setLikeSuccess(true);
      }

    }catch(error){
          console.error("Error posting like:", error);
    }
  };
  
  const renderSliderGallery = () => {
    
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3 "
          galleryImgs ={galleryImgs}
          href={href}
        />
        <BtnLikeIcon  isLiked={like} onChangeLike={handleLikeChange} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge desc={`${saleOff} % today`} className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {category?.rentalform} · {maxBedroom} beds
          </span>
          <div className="flex items-center space-x-2">
        
            <h2
              className={` font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === "default" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="">{address}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
          {price?.basePrice} · {price?.currency}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span>
            )}
          </span>
          {!!reviewStart && (
            <StartRating point={parseFloat(reviewStart.toFixed(1))} 
             reviewCount={reviewCount} />
          )}
        </div>
      </div>
    );
  };

  const renderModal = () =>{
    if (showLoginModal) {
      return (
        <div className={`modal-container ${showLoginModal ? 'visible' : 'hidden'}`}>
        <div className="modal bg-white dark:bg-neutral-900 p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-2">You need to log in to like this stay.</p>
          <button
            onClick={() => {
              setShowLoginModal(false);
              router('/login');
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Go to Login
          </button>
          <button
            onClick={() => setShowLoginModal(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
          >
            Close
          </button>
        </div>
      </div>
      );
    }
  
    if (likeSuccess) {
      return (
        <div className="modal-container">
          <div className="modal bg-white dark:bg-neutral-900 p-4 rounded-md shadow-md">
            <p className="text-lg font-semibold mb-2">Like saved successfully!</p>
            <button
              onClick={() => setLikeSuccess(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      );
    }
  
    return null;
  }

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      <Link to={href}>{renderContent()}</Link>
      {renderModal()}
      
    </div>
  );
};

export default StayCard;

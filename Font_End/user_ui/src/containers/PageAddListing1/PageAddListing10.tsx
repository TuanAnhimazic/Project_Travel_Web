import React, { FC, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { useListing } from "data/ListingStayContext/ListingStayContext";
import { AddStay_API } from "API/Stay/Stay";
import { StayData } from "data/ListingStayContext/ListingStayContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface PageAddListing10Props { }

function isListingDataEmpty(data: StayData) {
  if (!data) return true;

  const hasBasicInfo = data.title && data.address && data.description;
  const hasLocationInfo = data.location.street && data.location.state && data.location.city && data.location.country;
  const hasRoomInfo = data.maxGuest > 0 && data.bed > 0 && data.maxBedroom > 0 && data.maxBathroom > 0;
  const hasImages = data.featuredImage || (data.galleryImages && data.galleryImages.length > 0);

  return !(hasBasicInfo && hasLocationInfo && hasRoomInfo && hasImages);
}
//
const PageAddListing10: FC<PageAddListing10Props> = () => {

  const { stayData } = useListing();
  const [isAPILoading, setAPILoading] = useState(false); 

  // console.log("stayData:", stayData);
  // console.log("Is stayData empty?:", isListingDataEmpty(stayData));

  const handleSubmit = async () => {

    if (!stayData.userId) {
      console.log('UserId không hợp lệ. Không thể gửi dữ liệu.');
      return;
    }
    
    setAPILoading(true);
    try {

    const formData = new FormData();

    formData.append('stayDataJson', JSON.stringify(stayData));

    // Chuyển đổi featuredImage từ blob URL thành File
    if (stayData.featuredImage) {
      const response = await fetch(stayData.featuredImage);
      const blob = await response.blob();
      const featuredImageFile = new File([blob], `featuredImage.${blob.type.split('/')[1]}`, { type: blob.type });
      formData.append('featuredImage', featuredImageFile);
    }
    // Chuyển đổi từng hình ảnh trong galleryImages từ blob URL thành File
    if (stayData.galleryImages && stayData.galleryImages.length > 0) {
      for (let i = 0; i < stayData.galleryImages.length; i++) {
        const response = await fetch(stayData.galleryImages[i]);
        const blob = await response.blob();
        const galleryImageFile = new File([blob], `galleryImages${i}.${blob.type.split('/')[1]}`, { type: blob.type });
        formData.append(`galleryImages`, galleryImageFile);
      }
    }
    // console.log(Array.from(formData.entries()));

    
    
      const response = await AddStay_API(formData);
      const result: { success: Boolean, message: string } = response.data;
      if (result.success) {

        alert(" Pushing listing successfully ");
        toast.success(result.message);
      } else {
        
        console.log("connect api ", result.message);
        toast.error(result.message)
      }
    } catch (error) {
      console.error('An error occurred while fetching stay:', error);
      toast.error("An error occurred.");
    }finally{
      
   
      setAPILoading(false); 
    }

  };

  return (
    <CommonLayout
      nextBtnText={!isListingDataEmpty(stayData) ? (isAPILoading ? "Publishing..." : "Publish listing") : "Start Listing"}
      index="10"
      backtHref="/add-listing-9"
      nextHref={!isListingDataEmpty(stayData) ? "#" : "/add-listing-1"}
      onNext={!isListingDataEmpty(stayData) && !isAPILoading ? handleSubmit : undefined}
      isNextDisabled = {isAPILoading}
     
    >
      <>
        <div className="flex flex-col items-center justify-center">
          <div>
            <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
              Excellent, congratulations on completing the listing, it is
              waiting to be reviewed for publication
            </span>
          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {/* FORM */}
          {!isListingDataEmpty(stayData) ? (
            <div>
              <h3 className="text-lg font-semibold">This is your listing</h3>
              <div className="max-w-xs">
                <div className="max-w-xs mx-auto relative">
                  <div className="border border-gray-300 p-4 rounded-lg shadow-md">
                    <img
                      src={stayData.featuredImage}
                      alt={stayData.title}
                      className="mb-4 rounded-md"
                    />

                    {/* Discount Overlay */}
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                      <span>Discount: {stayData.saleOff}%</span>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800">
                      {stayData.title}
                    </h2>

                    <div className="flex justify-between text-gray-600 mt-3">
                      <p>{stayData.category.propertyType}</p>
                      <p>{stayData.category.rentalForm}</p>
                    </div>

                    <div className="text-gray-600 space-y-2 mt-3">
                      <span>{stayData.address}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-5 mt-8">
                <ButtonSecondary href="/add-listing-1">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <span className="ml-3">Edit</span>
                </ButtonSecondary>

                <ButtonPrimary href="/add-listing-1">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="ml-3">Preview</span>
                </ButtonPrimary>
              </div>
            </div>
          ) : (
            <div className="text-center mt-4">
              <span className="text-lg text-neutral-500 dark:text-neutral-400">
                Please enter data to display listing.
              </span>
            </div>
          )}
        </div>
        {/*  */}
      </>
    </CommonLayout>
  );
};

export default PageAddListing10;

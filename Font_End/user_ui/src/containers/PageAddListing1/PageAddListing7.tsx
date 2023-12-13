import React, { FC, useState, useEffect } from "react";
import CommonLayout from "./CommonLayout";
import { useListing } from "data/ListingStayContext/ListingStayContext";

export interface PageAddListing7Props { }

interface StayData {
  featuredImage: string;
  galleryImages:string[];
 
}

const PageAddListing7: FC<PageAddListing7Props> = () => {

  const {updateStayData, stayData} = useListing();
  const [coverImage, setCoverImage] = useState<string>(stayData.featuredImage);
  const [images, setImages] = useState<string[]>(stayData.galleryImages);
  const [isDataEmpty, setIsDataEmpty] = useState(true);

  useEffect(() => {
    setIsDataEmpty(!coverImage || images.length === 0);
  }, [coverImage, images]);
  //
  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
      
    }
    
  };
 
  //
  const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file));
      setImages(prevImages => [...prevImages, ...newImageUrls]);
      
    }
  };
 //
  const handleRemoveCoverImage = () => {
    setCoverImage("");
    if (coverImage) URL.revokeObjectURL(coverImage);
  };
  //
  const handleRemoveImage = (imageToRemove: string) => {
    setImages(prevImages => prevImages.filter(image => image !== imageToRemove));
    // Thu hồi blob URL
    URL.revokeObjectURL(imageToRemove);
  };
//
const handleNext =()=>{
  if (isDataEmpty) {
    alert("Please fill all the fields before continuing.");
    return;
  }

   const updateData:Partial<StayData> = {

      featuredImage: coverImage,
      galleryImages: images,
   }

   updateStayData(updateData);

}
//
  return (
    <CommonLayout
      index="07"
      backtHref="/add-listing-6"
      nextHref={!isDataEmpty ? "/add-listing-8" : "#"}
      onNext={handleNext}
      isNextDisabled = {isDataEmpty}
     
    >
      {/* ... */}
      <div className="space-y-8">
        {/* Cover Image Section */}
        <div>
          <span className="text-lg font-semibold">Cover image</span>
          <div className="mt-5">
            {/* Upload Box */}
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                multiple
                onChange={handleCoverImageChange}
              />
            </label>
            
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              PNG, JPG, GIF up to 10MB
            </p>
            {/* Cover Image Preview */}
            {coverImage && (
              <div className="relative mt-4">
                <img src={coverImage} alt="Cover Preview" className="w-full h-64 object-cover rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105" />
                <button onClick={handleRemoveCoverImage} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional Images Section */}
        <div>
          <span className="text-lg font-semibold">Pictures of the place</span>
          <div className="mt-5">
            {/* Upload Box */}
            <label
              htmlFor="file-upload-2"
              className="relative cursor-pointer  rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload-2"
                name="file-upload-2"
                type="file"
                className="sr-only"
                onChange={handleImagesChange}
              />
            </label>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              PNG, JPG, GIF up to 10MB
            </p>
            {/* Additional Images Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Preview ${index}`} className="object-cover rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full h-48" />
                  <button onClick={() => handleRemoveImage(image)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* ... */}
    </CommonLayout>
  );

};

export default PageAddListing7;



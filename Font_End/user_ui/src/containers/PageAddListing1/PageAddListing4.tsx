import React, { FC, useState, useEffect } from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import CommonLayout from "./CommonLayout";
import { GetAmenity_API } from "API/Stay/Amenity";
import { useListing } from "data/ListingStayContext/ListingStayContext";


export interface Amenity {
  id: number;
  name: string;
  isChecked: boolean;
  type: number;
}
export enum AmenityType {
  General = 0,
  Other = 1,
  Safe = 2,
}
export interface PageAddListing4Props { }

const PageAddListing4: FC<PageAddListing4Props> = () => {

  const {updateStayData, stayData} = useListing();
  const [amenities, setAmenities] = useState<Amenity[]>(
    stayData.bookingPolicy?.listAmenity
      ? stayData.bookingPolicy.listAmenity.map(item => ({
          id: item.amenityId,
          name: item.describe,
          isChecked: item.isDefaultChecked,
          type: item.type
        })):[]);
  
  const [error, setError] = useState<string | null>(null);
  const [isDataValid, setIsDataValid] = useState(false);

  
  useEffect(() => {
    let isMounted = true;
    const fetchAmenities = async () => {
      try {
       
        const response = await GetAmenity_API();
        const result: { success: boolean, message: string, data: any } = response.data;

        console.log(result);
        if (result.success) {

          if (isMounted) { 
            console.log("Fetch amenity: " , result.message);
            setAmenities(result.data);
          }
        } 
      } catch (error) {
        if (isMounted) {
          console.error("An unexpected error occurred", error);
          setError("Không thể kết nối với máy chủ. Vui lòng thử lại sau.");
        }
      }
    };
   
    fetchAmenities();
    return () => {
      isMounted = false; 
    };
  }, []);

  useEffect(() => {
    const isAnyAmenityChecked = amenities.some(amenity => amenity.isChecked);
    setIsDataValid(isAnyAmenityChecked);
  }, [amenities]);
  //
  const handleCheckboxChange = (amenityId: number) => {
    setAmenities(amenities.map(amenity => {
      if (amenity.id === amenityId) {
        return { ...amenity, isChecked: !amenity.isChecked };
      }
      return amenity;
    }));
  };
  

  
  //
  const handleNext = ()=>{
    if (!isDataValid) {
      alert("Please select at least one extension before continuing.");
      return;
    }
     
    const checkedAmenities = amenities.filter(amenity => amenity.isChecked).map(amenity => {
      return { amenityId: amenity.id, describe: amenity.name, isDefaultChecked: amenity.isChecked, type: amenity.type };
    });
    const updatedStayData = {
      ...stayData,
      bookingPolicy: {
        ...stayData.bookingPolicy,
        listAmenity: checkedAmenities
      }
    };
  
    updateStayData(updatedStayData);
  }

//  
  return (
    <CommonLayout
      index="04"
      backtHref="/add-listing-3"
      nextHref={isDataValid ? "/add-listing-5" : "#"}
      onNext={handleNext}
      isNextDisabled = {!isDataValid}
      
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Many customers have searched for accommodation based on amenities
            criteria
          </span>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              General amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {amenities.filter(a => a.type === AmenityType.General).map((amenity) => (
                <Checkbox
                  key={amenity.id}
                  label={amenity.name}
                  name={amenity.name}
                  checked={amenity.isChecked}
                  onChange={()=> handleCheckboxChange(amenity.id)}
                  
                />
              ))}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Other amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {amenities.filter(a => a.type === AmenityType.Other).map((amenity) => (
                <Checkbox
                  key={amenity.id}
                  label={amenity.name}
                  name={amenity.name}
                  checked={amenity.isChecked}
                
                  onChange={()=> handleCheckboxChange(amenity.id)}
                />
              ))}
            </div>
          </div>

          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              Safe amenities
            </label>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {amenities.filter(a => a.type === AmenityType.Safe).map((amenity) => (
                <Checkbox
                  key={amenity.id}
                  label={amenity.name}
                  name={amenity.name}
                  checked={amenity.isChecked}
                  onChange={()=> handleCheckboxChange(amenity.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing4;

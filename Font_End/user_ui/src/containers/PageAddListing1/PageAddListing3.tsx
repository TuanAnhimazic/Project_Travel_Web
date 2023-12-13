import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC, useState, useEffect } from "react";
import CommonLayout from "./CommonLayout";
import { useListing } from "data/ListingStayContext/ListingStayContext";


export interface PageAddListing3Props {}
interface StayData {
  maxGuest: number;
  bed: number;
  maxBedroom: number;
  maxBathroom: number;
 
}
const PageAddListing3: FC<PageAddListing3Props> = () => {

  const {updateStayData, stayData} = useListing();

  const[guest, setGuest] = useState<number>(stayData.maxGuest);
  const[bed, setBed] = useState<number>(stayData.bed);
  const[bedroom, setBedroom] = useState<number>(stayData.maxBedroom);
  const[bathroom, setBathroom] = useState<number>(stayData.maxBathroom);

  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(true);
  useEffect(() => {
    setIsDataEmpty(!guest || !bed || !bedroom || !bathroom);
  }, [guest, bed, bedroom, bathroom]);

  const handleNext =()=>{
    if (isDataEmpty) {
      alert("Please fill all the fields before continuing.");
      return;
    }
     
    const updatedData: Partial<StayData> ={
      maxGuest: guest,
      bed: bed,
      maxBedroom: bedroom,
      maxBathroom: bathroom,
    }

    updateStayData(updatedData);
  }

  const handleGuestChange = (value: number) => {
    setGuest(value);
  }

  const handleBedChange = (value: number) => {
    setBed(value);
  }

  const handleBedroomChange = (value: number) => {
    setBedroom(value);
  }

  const handleBathroomChange = (value: number) => {
    setBathroom(value);
  }
  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref={!isDataEmpty ? "/add-listing-4" : "#"}
      onNext={handleNext}
      isNextDisabled = {isDataEmpty}
    
    >
      <>
        <h2 className="text-2xl font-semibold">Size of your location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
         
          <NcInputNumber label="Guests" defaultValue={guest}  onChange={handleGuestChange}/>
          <NcInputNumber label="Beds" defaultValue={bed}  onChange={handleBedChange}/>
          <NcInputNumber label="Bedroom" defaultValue={bedroom} onChange={handleBedroomChange}/>
          <NcInputNumber label="Bathroom" defaultValue={bathroom} onChange={handleBathroomChange}/>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;

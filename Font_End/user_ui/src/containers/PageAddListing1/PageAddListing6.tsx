import React, { FC, useState, useEffect } from "react";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { useListing } from "data/ListingStayContext/ListingStayContext";

export interface PageAddListing6Props {}


const PageAddListing6: FC<PageAddListing6Props> = () => {

  const {updateStayData, stayData} = useListing();

  const[description, setDescription] = useState<string>(stayData.description);
  const[policyDescription, setPolicyDescription] = useState<string | undefined>(stayData.bookingPolicy?.policyDescription);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  useEffect(() => {
    setIsDataEmpty(description.trim() === '' || policyDescription?.trim() === '');
  }, [description, policyDescription]);
  //
  const handleNext =()=>{
    if (isDataEmpty) {
     
      alert("Please fill all the fields before continuing.");
      return;
    }
      const updatedStayData = {
        ...stayData,
        description: description,
        bookingPolicy: {
          ...stayData.bookingPolicy,
          policyDescription: policyDescription,
        }
      };
      updateStayData(updatedStayData);
  }
  //
  return (
    <CommonLayout
      index="06"
      backtHref="/add-listing-5"
      nextHref={!isDataEmpty ? "/add-listing-7" : "#"}
      onNext={handleNext}
      isNextDisabled = {isDataEmpty}
      
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Your place description for client
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Mention the best features of your accommodation
          </span>
        </div>

        <Textarea placeholder="..." rows={10} value={description} onChange={(e)=>setDescription(e.target.value)} />
        <div>
          <h2 className="text-2xl font-semibold">
          Describe your housing policy
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Mention Payment and Cancellation Policy
          </span>
        </div>

        <Textarea placeholder="..." rows={10} value={policyDescription} onChange={(e)=>setPolicyDescription(e.target.value)} />
      </>
    </CommonLayout>
  );
};

export default PageAddListing6;

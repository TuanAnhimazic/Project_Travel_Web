import React, { FC, useState, useEffect } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { useListing } from "data/ListingStayContext/ListingStayContext";
import { useAuth } from "containers/AuthContext/AuthContext";


interface Category {
  category: {
    propertyType: string;
    rentalForm: string;
  };
  title: string;
  userId: number
 
}
export interface PageAddListing1Props {}

const PageAddListing1: FC<PageAddListing1Props> = () => {

  const{user} = useAuth();
  const AuthorId = user ?user.id: null;
  const {updateStayData, stayData} = useListing();
  const [propertyType, setPropertyType] = useState<string>(stayData.category.propertyType);
  const [placeName, setPlaceName] = useState<string>(stayData.title);
  const [rentalForm, setRentalForm] = useState<string>(stayData.category.rentalForm);

  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(true);

  useEffect(() => {
    setIsDataEmpty(!propertyType || !placeName || !rentalForm);
  }, [propertyType, placeName, rentalForm]);
  
  const handleNext =()=>{

    if (isDataEmpty) {
      // Thực hiện thông báo hoặc hành động nếu dữ liệu rỗng
      alert("Please fill all the fields before continuing.");
      return;
    }
    const updatedData: Partial<Category> = {
      category: {
        propertyType,
        rentalForm
      },
      title: placeName,
      userId: AuthorId || undefined,
    };
  
    updateStayData(updatedData);
  }
  
  //
  return (
    <CommonLayout
      index="01"
      backtHref="/add-listing-1"
      nextHref={!isDataEmpty ? "/add-listing-2" : "#"}
      onNext={handleNext}
      isNextDisabled={isDataEmpty}
      
      
    >
      <>
        <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
        <FormItem
            label="Choose a property type"
            desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
          >
            <Select value={propertyType} onChange={(e)=>setPropertyType(e.target.value)}>
              <option value="Hotel">Hotel</option>
              <option value="Cottage">Cottage</option>
              <option value="Villa">Villa</option>
              <option value="Cabin">Cabin</option>
              <option value="Farm stay">Farm stay</option>
              <option value="Houseboat">Houseboat</option>
              <option value="Lighthouse">Lighthouse</option>
            </Select>
          </FormItem>
       
          {/* ITEM */}
          <FormItem
            label="Place name"
            desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
          >
            <Input placeholder="Places name"
            value={placeName}
            onChange={(e)=>setPlaceName(e.target.value)} />
          </FormItem>

          {/* ITEM */}
          <FormItem
            label="Rental form"
            desc="Entire place: Guests have the whole place to themselves—there's a private entrance and no shared spaces. A bedroom, bathroom, and kitchen are usually included."
          >
            <Select value={rentalForm} onChange={(e)=>setRentalForm(e.target.value)}>
               <option value="Hotel">Entire place</option>
              <option value="Private room">Private room</option>
              <option value="Share room">Share room</option>
            </Select>
          
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;

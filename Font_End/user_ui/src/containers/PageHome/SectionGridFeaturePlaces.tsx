import React, { FC, ReactNode, useEffect, useState } from "react";
import { FamousPlace, StayData } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import { GetFamousLocation_API } from "API/Stay/Stay";

// OTHER DEMO WILL PASS PROPS


//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayData[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = [],
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that  recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"], // one city have a lots of stay
}) => {
  const [famousPlaces, setFamousPlaces] = useState<FamousPlace[]>([]);
  const [currentStays, setCurrentStays] = useState<StayData[]>([]);
  const [cityTabs, setCityTabs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
 

 useEffect(()=>{
  fetchLocation();
 }, [])

 useEffect(() => {
  const newCityTabs = famousPlaces.map(place => place.location.city);
  const uniqueCityTabs = Array.from(new Set(newCityTabs)); // Loại bỏ các giá trị trùng lặp
  setCityTabs(uniqueCityTabs);

  // Đặt các Stay của thành phố mặc định
  if (uniqueCityTabs.length > 0) {
    const defaultCity = uniqueCityTabs[0];
    const selectedPlace = famousPlaces.find(place => place.location.city === defaultCity);
    if (selectedPlace) {
      setCurrentStays(selectedPlace.stays);
    }
  }
}, [famousPlaces]);

 const fetchLocation = async()=>{
  setIsLoading(true);
   try{
    const response =  await GetFamousLocation_API();
    if(response){
      console.log("fetch Location: ", response.data);
      setFamousPlaces(response.data);
    }

   }catch(error){
    console.log("An Error fetch location", error);
   }finally{
    setIsLoading(false);
   }
 }
  const renderCard = (stay: StayData) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  const handleTabClick = (cityName : string) => {
    const selectedPlace = famousPlaces.find(place => place.location.city === cityName);
    if (selectedPlace) {
      setCurrentStays(selectedPlace.stays);
    }
  };

  const handleShowMore = () => {
   
    
    
  };

 

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={cityTabs[0]}
        subHeading={subHeading}
        tabs={cityTabs}
        heading={heading}
        onClickTab={handleTabClick }
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {isLoading ? (
        <div>Loading...</div>
      ) : (
        currentStays.map((stay) => renderCard(stay))
      )}
        
      </div>
      <div className="flex mt-16 justify-center items-center">

          <ButtonPrimary loading onClick={handleShowMore}>Show me more</ButtonPrimary>
       
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;

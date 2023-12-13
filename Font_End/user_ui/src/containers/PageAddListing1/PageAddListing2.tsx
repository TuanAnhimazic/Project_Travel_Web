import { MapPinIcon } from "@heroicons/react/24/solid";
import LocationMarker from "components/AnyReactComponent/LocationMarker";
import Label from "components/Label/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useState, useEffect } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { useListing } from "data/ListingStayContext/ListingStayContext";


export interface PageAddListing2Props {}
interface Location {
  location: {
    country: string;
    street: string;
    state: string; 
    city: string;
    lat: number, lng: number
  };
  address: string;

}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const {updateStayData, stayData} = useListing();

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  });
   
  const [country, setCountry] = useState(stayData.location.country);
  const [street, setStreet] = useState(stayData.location.street);
  const [city, setCity] = useState(stayData.location.city);
  const [state, setState] = useState(stayData.location.state);
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(true);

  useEffect(() => {
    setIsDataEmpty(!country || !street || !state || !city);
  }, [country, street, state, city]);


  //
  const handleLocation = async () => {
    // Combine address parts into a single string
    const fullAddress = `${street}, ${state}, ${city}, ${country}`;

    // Use the Google Maps Geocoding API to find coordinates based on the address
    const geocoder = new window.google.maps.Geocoder();
  
    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const result = results[0].geometry.location;
        setLocation({ lat: result.lat(), lng: result.lng() });
      } else {
        // Handle geocoding error
        console.error("Geocoding failed. Please check the address.");
      }
    });
  };
  //
  const handleNext = () => {

    if (isDataEmpty) {
     
      alert("Please fill all the fields before continuing.");
      return;
    }
    const fullAddress = `${street}, ${state}, ${city}`;
    const updatedData: Partial<Location> = {
      
      location: {
        country: country,
        street: street,
        state: state,
        city: city,
        lat: location.lat,
        lng: location.lng
      },
      address:fullAddress,
    };
    updateStayData(updatedData);
  }
  //
  return (
    <CommonLayout
      index="02"
      backtHref="/add-listing-1"
      nextHref={!isDataEmpty ? "/add-listing-3" : "#"}
      onNext={handleNext}
      isNextDisabled={isDataEmpty}
    
    >
      <>
        <h2 className="text-2xl font-semibold">Your place location</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          <ButtonSecondary onClick={handleLocation}>
            <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            <span className="ml-3">Use location</span>
          </ButtonSecondary>
          {/* ITEM */}
          <FormItem label="Country/Region">
          <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </FormItem>
          <FormItem label="Street">
            <Input placeholder="..." value={street} onChange={(e)=> setStreet(e.target.value)} />
          </FormItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
            <FormItem label="State">
              <Input value={state} onChange={(e)=>setState(e.target.value)} />
            </FormItem>
            <FormItem label="City">
              <Input value={city} onChange={(e)=>setCity(e.target.value)} />
            </FormItem>
          </div>
          <div>
            <Label>Detailed address</Label>
            <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">

            </span>
            <div className="mt-4">
              <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                <div className="rounded-xl overflow-hidden">
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: "AIzaSyCe8vZWGr9bt40TSwQ8ThC5Ln-O_dSPGY8",
                    }}

                    defaultZoom={15}
                    center={location}
                  >
                    <LocationMarker lat={location.lat} lng={location.lng} />
                  </GoogleMapReact>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing2;


import React, { createContext, useContext, useState, ReactNode } from 'react';
export interface BlockedDate{
  startDate: Date;
  endDate: Date;
};
export interface Rule {
  stayRuleId: number;
  describe: string;
  IsDefaultAllowed: boolean;
  IsDefaultChargeable: boolean;
};
export interface Amenity {
  amenityId: number;
  describe: string;
  isDefaultChecked: boolean;
  type: number
}

// Định nghĩa type cho dữ liệu stay
export type StayData = {
  category: {
    propertyType: string;
    rentalForm: string;
  };
  title: string;
  address: string;
  location: {
    country: string;
    street: string;
    state: string;
    city: string;
    lat: number;
    lng: number
  };
  maxGuest: number;
  maxBedroom: number;
  bed: number;
  maxBathroom: number;
  description: string;
  featuredImage: string;
  galleryImages: string[];
  bookingPolicy:{
    listAmenity?: Amenity[] | undefined;
    listRule?: Rule[];
    policyDescription?: string;
    maxNight?: number | null,
    minNight?: number | null;
    checkInTime?: Date | null;
    checkOutTime?: Date | null;
    BlockedDate?: BlockedDate[];

  } | undefined;
  price: {
    basePrice: string,
    currency: string,
  };
  saleOff: string,
  userId: number | null | undefined,

};


type ListingContextType = {
  stayData: StayData;
  updateStayData: (newData: Partial<StayData>) => void;
};

type ListingProviderProps = {
  children: ReactNode;
};

// Tạo context
const ListingContext = createContext<ListingContextType | undefined>(undefined);

// Provider component
export const ListingStayProvider: React.FC<ListingProviderProps> = ({ children }) => {


 
  const [stayData, setStayData] = useState<StayData>({
    category: {
      propertyType: "",
      rentalForm: "",
    },
    title: "",
    address: "",
    location: {
      country: "",
      street: "",
      state: "",
      city:"",
      lat: 0,
      lng: 0
    },
    maxGuest: 0,
    bed:0,
    maxBedroom: 0,
    maxBathroom: 0,
    description: "",
    featuredImage: "",
    galleryImages: [],
    bookingPolicy:{
      listAmenity: [],
      listRule: [],
      policyDescription:"...",
      maxNight: 10,
      minNight: 1,
      checkInTime: new Date(),
      checkOutTime: new Date(),
      BlockedDate: [],
     
    },
    price: {
      basePrice: "",
      currency: "USD",
    },
    saleOff: "",
    userId: null,

  });

    // console.log("Updated listing stay context:", stayData);

  //
  const updateStayData = (newData: Partial<StayData>) => {
    setStayData(prevState => ({
      ...prevState,
      ...newData
    }));
  };

  return (
    <ListingContext.Provider value={{ stayData, updateStayData }}>
      {children}
    </ListingContext.Provider>
  );
};

// Hook for using the Listing context
export const useListing = () => {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error('useListing must be used within a ListingProvider');
  }
  return context;
};

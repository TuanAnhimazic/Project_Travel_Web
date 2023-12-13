//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}


// Define additional types that are used within StayData
export interface UserLikeType{
  stay: StayData;
}
export interface UserStayReviewType{

  user: UserData;
  stays: StayData[];
  averageReviewStart: number;
  totalReviewCount: number;
}
export interface CardAuthor {

  userId: number;
  fullName: string;
  avatar: string;
  jobName: string;
  count: number;
  bgImage: string;
  href: string;
  reviewCount: number;
  averageReview: number;
}

export interface FamousPlace {
  location: StayLocation;
  stays: StayData[];
}

export interface ReviewData {
  id: number;
  userId: number;
  stayId: number;
  rating: number;
  comment: string;
  dateCreated: Date; 
  user:{
    userId: number;
    fullName: string;
    avatar: string;
  };
}
export interface Amenity {
  id: number;
  describe: string;
 
}
export interface Rule {
  id: number;
  describe: string;
  isDefaultAllowed: boolean;
  isDefaultChargeable: boolean;
}

export interface BlockedDate {
  id: number;
  startDate: Date;
  endDate: Date;
}

export interface StayCategory {
  id: number;
  propertyType: string;
  rentalform: string;
}

export interface StayLocation {
  id: number;
  country: string;
  street: string;
  state: string;
  city: string;
  lat: number;
  lng: number;
}

export interface StayPrice {
  id: number;
  basePrice: string;
  currency: string;
}

export interface BookingPolicy {
  id: number;
  listAmenity?: Amenity[];
  listRule?: Rule[];
  policyDescription?: string;
  maxNight?: number | null;
  minNight?: number | null;
  checkInTime?: Date | null;
  checkOutTime?: Date | null;
  blockedDate?: BlockedDate[];
}
 export interface GalleryImgs {
  id: number;
  listImage: string;
}

export interface UserData {
  id: number;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  birthday?: Date | null;
  gender?: string;
  avatar?: string;
  description?: string;
  jobName?: string;
  bgImage?: string;
  created?: Date | null;
  
}
export enum StayStatus {
  pending = 0,
  approved = 1,
  rejected = 2
}
// Main StayData interface
export interface StayData {
  id: number | string;
  category: StayCategory;
  user: UserData;
  title: string;
  href: string;
  address: string;
  location: StayLocation;
  viewCount?: number;
  reviewStart?: number;
  reviewCount?: number;
  like: boolean;
  maxGuest: number;
  maxBedroom: number;
  bed: number;
  maxBathroom: number;
  description: string;
  featuredImage: string;
  galleryImgs: GalleryImgs[];
  price: StayPrice;
  saleOff: string ;
  status: StayStatus;
  userId?: number;
  author: AuthorType;
  listingCategory: TaxonomyType;

}


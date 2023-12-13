import { ListingGalleryImage } from "components/ListingImageGallery/utils/types";

export const PHOTOS: string[] = [

];



export const createImageGallery = (photos: string[]): ListingGalleryImage[] => {
  return photos.map((item, index): ListingGalleryImage => {
    return {
      id: index,
      url: item,
    };
  });
};

 export const imageGallery: ListingGalleryImage[] = [...PHOTOS].map(
  (item, index): ListingGalleryImage => {
   return {
       id: index,
      url: item,
   };
  }
);



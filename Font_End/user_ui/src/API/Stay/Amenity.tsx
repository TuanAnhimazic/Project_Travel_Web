import axiosConfig from '../axiosConfig';

const End_Point_Amenity = {
  
    List: "Amenity/AmenityList",
   
    
}




export const GetAmenity_API = async () => {
    try {
      const response = await axiosConfig.get(End_Point_Amenity.List);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

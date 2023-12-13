
import axiosConfig from '../axiosConfig';

const End_Point_Stay = {
  
    Add: "Stay/add",
    GetStay: "GetStay/listingStay",
    StayById: "GetStay/GetStayById",
    PostReview: "ReviewStay/postReview",
    GetReviewById: "ReviewStay/getReview",
    GetPolicyById: "StayPolicy/getStayPolicy",
    GetFamousLocation: "GetStay/getFamousLocations",
    
};

export const AddStay_API = async (data:any) => {
    try {
      const response = await axiosConfig.post(End_Point_Stay.Add, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetStay_API = async () => {
    try {
      const response = await axiosConfig.get(End_Point_Stay.GetStay);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetStayById_API = async (id: number) => {
    try {
      const response = await axiosConfig.get(`${End_Point_Stay.StayById}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  
  export const PostReviewStay_API = async (data: any) => {
    try {
      const response = await axiosConfig.post(End_Point_Stay.PostReview, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetPolicyStay_API = async (id: number) => {
    try {
      const response = await axiosConfig.get(`${End_Point_Stay.GetPolicyById}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetReviewStay_API = async (id: number) => {
    try {
      const response = await axiosConfig.get(`${End_Point_Stay.GetReviewById}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetFamousLocation_API = async () => {
    try {
      const response = await axiosConfig.get(End_Point_Stay.GetFamousLocation);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };






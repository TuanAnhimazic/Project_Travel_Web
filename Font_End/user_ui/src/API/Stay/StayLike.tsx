import axiosConfig from '../axiosConfig';

const End_Point_Stay = {
  
   PostLikeStay: "StayLike/postLike",
   StayLikeSaved:"StayLike/likeSaved"
 
    
};


export const PostLike_API = async (data: any) => {
    try {
      const response = await axiosConfig.post(End_Point_Stay.PostLikeStay, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetLikeStay_API = async (id: number) => {
    try {
      const response = await axiosConfig.get(`${End_Point_Stay.StayLikeSaved}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

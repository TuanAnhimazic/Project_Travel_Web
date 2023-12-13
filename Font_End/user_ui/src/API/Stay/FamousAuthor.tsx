
import axiosConfig from '../axiosConfig';

const End_Point_Stay = {
  
    GetFamousAuthor: "FamousAuthor/getFamousAuthor",
    GetAuthor:"Profiles/GetUserStayAndReviews",
 
    
};

export const GetFamousAuthor_API = async () => {
    try {
      const response = await axiosConfig.get(End_Point_Stay.GetFamousAuthor);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const GetAuthor_API = async (id: number) => {
    try {
      const response = await axiosConfig.get(`${End_Point_Stay.GetAuthor}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

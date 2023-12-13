import axiosConfig from '../axiosConfig';

const End_Point_Rule = {
  
    add: "StayRule/add",
    list:"StayRule/listRule",
    delete:"StayRule/delete",
   
    
}



export const GetRules_API = async () => {
    try {
      const response = await axiosConfig.get(End_Point_Rule.list);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const AddRules_API = async (rule: any) => {
    try {
      const response = await axiosConfig.post(End_Point_Rule.add, rule);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const  DeleteRule_API= async (id: number) => {
    try {
      const response = await axiosConfig.delete(`${End_Point_Rule.delete}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
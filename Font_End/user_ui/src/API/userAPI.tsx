import axiosConfig from "./axiosConfig";


const End_Point_USER = {
  
    Login: "/Account/login",
    SignUp: "/Account/signup",
    Oauth : "/OauthGoogle/oauth-callback",
    Authorize : "/Account/UserInfor",
    Update: "/UpdateUserInfor/updateUser",
    GetUserInfor: "/UpdateUserInfor/getUserInfo"
    

}

export interface LoginData {
    email?: string;
    password?: string;
    // Các trường khác nếu cần
  }

export interface SignupData {

    fullname?: string;
    address?:string;
    phonenumber?: string;
    email?: string;
    password?: string;
    // Các trường khác nếu cần
  }

export interface  dataLogin {

  email?: string,
  password?: string,
}

export interface dataCode {

    code: string;
  }

  export interface UserData {
    fullName?: string;
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
  
export const Login_API = async (data: LoginData) => {
    try {
      const response = await axiosConfig.post(End_Point_USER.Login, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const SignUp_API = async (data: SignupData) => {
    try {
      const response = await axiosConfig.post(End_Point_USER.SignUp, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const UpdateUser_API = async ( id:number, data: UserData) => {
    try {
      const response = await axiosConfig.post(`${End_Point_USER.Update}/${id}`, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const UserInfor_API = async ( id:number) => {
    try {
      const response = await axiosConfig.get(`${End_Point_USER.GetUserInfor}/${id}`);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const Authorization_Token = async (token: string) => {
    try {
      const response = await axiosConfig.get(End_Point_USER.Authorize,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
 

  export const Oauth_callback = async (data: dataCode) => {
    try {
      const response = await axiosConfig.post(End_Point_USER.Oauth, data);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };


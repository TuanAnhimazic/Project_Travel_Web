import React, { FC, useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import googleSvg from "images/Google.svg";
import { Authorization_Token, Login_API, Oauth_callback, dataCode } from "API/userAPI";
import {useAuth} from "containers/AuthContext/AuthContext";
import axios from "axios";


export interface PageLoginProps {
  className?: string;

}

const initData = {

  email: "",
  password:"",

}

//kiểm tra email
const isValidEmail = (email: string) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ClientID = "354909848546-jsh2jd5e6gmqd2atthdp8cstbu8ian53.apps.googleusercontent.com";
const REDIRECT_URI = "http://localhost:3000/login";/// redirect to backend web api

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
 
  const auth = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);

  // hàm này sẽ đưa người dùng dến trang đang nhập
  const handleGoogleLogin = () => {

    // Define the Google OAuth URL
    const googleOAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${ClientID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;

    // Redirect the user to the Google login page
    window.location.href = googleOAuthURL;

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    if (authCode) {
      // Send the code to the backend
      console.log("this is authcode:", authCode);
      
      handleCodeSubmit({code: authCode});
    }
  }, []);


  const handleCodeSubmit = async(code: dataCode)=>{
     console.log("Send code to backend called!!")
    try {
      const response = await Oauth_callback(code);
      
      // Xử lý phản hồi từ backend (thành công hoặc thất bại)
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);
      // Sử dụng Axios để gọi Google API để lấy thông tin người dùng
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("this is Information of the user from google:",userInfoResponse.data )

    const userInfo = userInfoResponse.data;
    // Lưu thông tin người dùng vào Authcontext
    if (auth) {
      auth.login(userInfo);
      navigate('/');
    }
   
      
    } catch (error) {
      // Xử lý lỗi (ví dụ: xác thực thất bại)
      console.error(error);
    }

  }

  // Hàm kiểm tra lỗi
const validateData = () => {
  const validationErrors: any = {};

  
  if (!data.email) {
    validationErrors.email = "Email is required";
  } else if (!isValidEmail(data.email)) {
    validationErrors.email = "Invalid email format";
  }
  if (!data.password) {
    validationErrors.password = "Password is required";
  }
  

  return validationErrors;
};

  const Handel_login = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsLoading(true);

  const validationErrors = validateData();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setIsLoading(false); 
    return;
  }

    const userData = {

      email: data.email,
      password: data.password,
    };

    try{

     const  response = await Login_API(userData);
     const result:{success:boolean, message: string, token: string} = response.data;

     if(result.success){

       alert(result.message);
       if(result.token){
                
          const res = await Authorization_Token(result.token);
          const getUser:{success:boolean, message: string, data: string} = res.data;

          if(getUser.success){
             console.log(getUser.message);
             const userInfo: any = getUser.data;
             auth?.login(userInfo);
             navigate('/'); 

          }
           
       }

     }else{

        alert(result.message);
     }
       
    }catch (error:any){
      
      alert("Login failed: " + error.message);

    }finally{
      setIsLoading(false)
    }

  }

  const HandleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) =>{

    const {name, value} = event.target;
    setData({
      ...data,
      [name]: value,
    });
  }


  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Travel Booking </title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">

            <button
              onClick={handleGoogleLogin}
              className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <img
                className="flex-shrink-0"
                src={googleSvg}
                alt="Google"
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                Sign up with Google
              </h3>
            </button>


          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={(e)=>Handel_login(e)} >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name="email"
                value={data.email}
                onChange={HandleChangeValue}
                error={errors.email || ""}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input 
              type="password"
               className="mt-1"
               name="password"
               value={data.password}
               onChange={HandleChangeValue} 
               error={errors.password || ""}/>
            </label>
            <ButtonPrimary disabled={isLoading} type="submit">
            {isLoading ? 'Loading...' : 'Continue'}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/signup">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;

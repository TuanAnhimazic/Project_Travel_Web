import React, { FC, useState } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useNavigate } from "react-router-dom";

import { SignUp_API } from "API/userAPI";



export interface PageSignUpProps {
  className?: string;
}


const InitData = {

  fullName: "",
  address: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
}
//kiểm tra email
const isValidEmail = (email: string) => {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// kiểm tra password
const validatePasswordStrength = (password: string) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  return passwordRegex.test(password);
};

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const navigate = useNavigate()

  const [data, setData] = useState(InitData);
  //
  const [errors, setErrors] = useState(InitData);
  //

  const [isLoading, setIsLoading] = useState(false);

  // Hàm kiểm tra lỗi
  const validateData = () => {
    const validationErrors: any = {};

    if (!data.fullName) {
      validationErrors.fullName = "Full Name is required";
    }
    if (!data.address) {
      validationErrors.address = "Address is required";
    }
    if (!data.phoneNumber) {
      validationErrors.phoneNumber = "Phone Number is required";
    }
    if (!data.email) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!data.password) {
      validationErrors.password = "Password is required";
    }
    if (!validatePasswordStrength(data.password)) {
      validationErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (data.password !== data.confirmPassword) {
      validationErrors.confirmPassword = "Password and Confirm Password do not match";
    }

    return validationErrors;
  };


  //
  const Handel_SignUp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Gọi hàm kiểm tra lỗi
    const validationErrors = validateData();

    if (Object.keys(validationErrors).length > 0) {
      // Có lỗi, cập nhật trạng thái lỗi và không thực hiện đăng ký
      setErrors(validationErrors);
      setIsLoading(false); 
      return;
    }

    const dataUser = {
      fullName: data.fullName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    };

    try {
      // Gửi thông tin đăng ký lên máy chủ bằng POST request
      const response = await SignUp_API(dataUser);

      const result: { success: boolean, message: string } = response.data

      if (result.success) {
        // đăng ký thành công
        alert(result.message);
        navigate("/login");
      } else {
        //đăng ký thất bại
        alert(result.message);
      }


      // Đặt lại trạng thái của trường đăng ký sau khi đăng ký thành công
      setData(InitData);
    } catch (error: any) {
      // Xử lý lỗi nếu có
      alert("Registration failed: " + error.message);
    }finally{
      setIsLoading(false);
    }

  }

  //
  const handleInputChange = (event: any) => {

    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });

  }

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Booking </title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={(e) => Handel_SignUp(e)}>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Full Name
              </span>
              <Input type="text" className="mt-1" value={data.fullName} name="fullName"
                onChange={handleInputChange}
                error={errors.fullName || ""} />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Address
              </span>
              <Input type="text" className="mt-1" value={data.address} name="address"
                onChange={handleInputChange}
                error={errors.address || ""} />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Number Phone
              </span>
              <Input type="text" className="mt-1" value={data.phoneNumber} name="phoneNumber"
                onChange={handleInputChange}
                error={errors.phoneNumber || ""} />
            </label>


            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={data.email}
                name="email"
                onChange={handleInputChange}
                error={errors.email || ""}
              />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" value={data.password} name="password"
                onChange={handleInputChange}
                error={errors.password || ""} />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input type="password" className="mt-1" value={data.confirmPassword} name="confirmPassword"
                onChange={handleInputChange}
                error={errors.confirmPassword || ""} />
            </label>

            <ButtonPrimary disabled={isLoading} isDataAvailable type="submit">
            {isLoading ? 'Loading...' : 'Continue'}
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;

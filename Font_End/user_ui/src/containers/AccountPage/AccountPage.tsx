import Label from "components/Label/Label";
import React, { FC, useState, useEffect,ChangeEvent, FormEvent  } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import Textarea from "shared/Textarea/Textarea";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet";
import { UpdateUser_API, UserInfor_API } from "API/userAPI";
import { useParams } from "react-router-dom";
import { UserData } from "data/types";

const isValidPhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phoneNumber);
};
const isValidLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};


export interface AccountPageProps {
  className?: string;
}


const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {

  const {id} = useParams();
  const [userInfo, setUserInfo] = useState<UserData>({
    id: 0,
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthday: null,
    gender: "",
    description: "",
    jobName: "",
    bgImage: "",
    created: null,
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const authId = id ? parseInt(id, 10) : null;
    if (authId) {
      fetchAuthInfor(authId);
    }
  },[id])

  const fetchAuthInfor = async (id: number) =>{
    setLoading(true);
    try{
      const response = await UserInfor_API(id);
      const result:{success:boolean, message: string, data: any} = response.data;
      if(result.success){
        setUserInfo(result.data);
      }else{
        console.log("Fetch Infor User failed:", result.message);
      }
    }catch(error){
      console.log(" An Error Fetch Infor User failed:", error);
    }finally{
      setLoading(false);
    }
  }

const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;

  if (files && files.length > 0) {
    const file = files[0];
    setAvatarFile(file);
  }
};
 
  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    // Kiểm tra độ dài cho từng trường dữ liệu
    switch (fieldName) {
      case "fullName":
        if (!isValidLength(fieldValue, 50)) {
          setError("Full name is too long (max 50 characters).");
        } else {
          setError(null);
        }
        break;
      case "description":
        if (!isValidLength(fieldValue, 200)) {
          setError("Description is too long (max 200 characters).");
        } else {
          setError(null);
        }
        break;
      case "phoneNumber":
        if (!isValidPhoneNumber(fieldValue)) {
          setError("Invalid phone number");
        } else {
          setError(null);
        }
        break;
        case "address":
          if (!isValidLength(fieldValue, 100)) {
            setError("Address is too long (max 100 characters).");
          } else {
            setError(null);
          }
        break;
      // Các trường dữ liệu khác
      default:
        break;
    }


    setUserInfo({
      ...userInfo,
      [fieldName]: fieldValue,
    });
  };

//

const HandelUpdate = async(e: FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  console.log("userInfor:", userInfo);
  const formData = new FormData();

  // Thêm các trường thông tin người dùng vào formData
  formData.append('userInfor', JSON.stringify(userInfo));

  // Thêm avatar nếu người dùng đã chọn file mới
  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }
 console.log("formdata:", formData);
  
 
}
//
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || Booking </title>
      </Helmet>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Account information</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          
            {/* Hiển thị thông báo nếu đang tải dữ liệu */}
            {loading && <p>Loading data...</p>}
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
          <form onSubmit={HandelUpdate}>
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-start">
                <div className="relative rounded-full overflow-hidden flex">
                  <Avatar sizeClass="w-32 h-32" />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="mt-1 text-xs">Change Image</span>
                  </div>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    name="avatar"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
                <div>
                  <Label>Name</Label>
                  <Input className="mt-1.5"
                    name="fullName"
                    value={userInfo.fullName || ''}
                    onChange={handleChangeValue} />
                </div>
                {/* ---- */}
                <div>
                  <Label>Gender</Label>
                  <Select className="mt-1.5"
                    name="gender"
                    value={userInfo.gender ||''}
                    onChange={handleChangeValue}>

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Select>
                </div>
                {/* ---- */}
                <div>
                  <Label>Username</Label>
                  <Input className="mt-1.5"
                    value={userInfo.email}
                    readOnly
                  />
                </div>
                {/* ---- */}
                <div>
                  <Label>Email</Label>
                  <Input className="mt-1.5"
                    value={userInfo.email}
                    readOnly />
                </div>
                {/* ---- */}
                <div className="max-w-lg">
                  <Label>Date of birth</Label>
                  <Input
                    className="mt-1.5"
                    type="date"
                    name="birthday"
                    value={userInfo.birthday instanceof Date ? userInfo.birthday.toISOString().split('T')[0] : ''}
                    onChange={handleChangeValue}
                  />
                </div>
                {/* ---- */}
                <div>
                  <Label>Address</Label>
                  <Input className="mt-1.5"
                    name="address"
                    value={userInfo.address || ''}
                    onChange={handleChangeValue} />
                </div>
                {/* ---- */}
                <div>
                  <Label>Phone number</Label>
                  <Input className="mt-1.5"
                    name="phoneNumber"
                    value={userInfo.phoneNumber || ''}
                    onChange={handleChangeValue} />
                </div>
              
                {/* ---- */}
                <div>
                  <Label>About you</Label>
                  <Textarea className="mt-1.5"
                    name="description"
                    value={userInfo.description || ''}
                    onChange={handleChangeValue} />
                </div>
                <div className="pt-2">
                  <ButtonPrimary type="submit" disabled={loading} >
                  {loading ? "Updating..." : "Update info"}
                  </ButtonPrimary>
                </div>
              </div>

            </div>
          </form>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPage;

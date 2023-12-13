import { Tab } from "@headlessui/react";
 import StayCard from "components/StayCard/StayCard";
import React, { useState, useEffect } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import CommonLayout from "./CommonLayout";
import { useParams } from "react-router-dom";
import { GetLikeStay_API } from "API/Stay/StayLike";
import { UserLikeType } from "data/types";

const AccountSavelists = () => {

  const {id} = useParams();
  const [userLike, setUserLike] = useState<UserLikeType[]>([]);
 
  // console.log("userLike:", userLike);
  
  useEffect(() => {
    const AuthorId = id ? parseInt(id, 10) : null;
    if (AuthorId) {
      fetchStayLike(AuthorId);
    }
  }, [id]);

  const fetchStayLike = async (id: number) => {

    try {
      const response = await GetLikeStay_API(id);
      const result: { success: boolean, message: string, data: any } = response.data;
      if (result.success) {
        setUserLike(result.data);
       
      } else {
        console.log("Fetch author failed:", result.message);
      }
    } catch (error) {

      console.log("An Error while fetch author:", error);
    }
  }

  const renderSection1 = () => {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Save your stay list</h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
           
            <Tab.Panels>
              <Tab.Panel className="mt-8">
                 <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {userLike.map((userLikes) => (
                    <StayCard key={userLikes.stay.id} data={userLikes.stay} />
                  ))}

                </div> 
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CommonLayout>{renderSection1()}</CommonLayout>
    </div>
  );
};

export default AccountSavelists;

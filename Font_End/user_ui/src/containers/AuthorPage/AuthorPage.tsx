import { Tab } from "@headlessui/react";
import CommentListing from "components/CommentListing/CommentListing";
import StartRating from "components/StartRating/StartRating";
import StayCard from "components/StayCard/StayCard";

import React, { FC, useEffect, useState } from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import SocialsList from "shared/SocialsList/SocialsList";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { GetAuthor_API } from "API/Stay/FamousAuthor";
import { UserStayReviewType } from "data/types";
import { format } from 'date-fns';

export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = "" }) => {

  const { id } = useParams();
  const [author, setAuthor] = useState<UserStayReviewType>();
  const INITIAL_DISPLAY_COUNT = 4;
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);
  let user = author?.user;
  let stay = author?.stays;


  useEffect(() => {
    const AuthorId = id ? parseInt(id, 10) : null;
    if (AuthorId) {
      fetchAuthor(AuthorId);
    }
  }, [id]);

  const fetchAuthor = async (id: number) => {

    try {
      const response = await GetAuthor_API(id);
      const result: { success: boolean, message: string, data: any } = response.data;
      if (result.success) {
        // console.log("fetch author by id:", result.data);
        setAuthor(result.data);
      } else {
        console.log("Fetch author failed:", result.message);
      }
    } catch (error) {

      console.log("An Error while fetch author:", error);
    }
  }

  const handleShowMore = () => {
    setDisplayCount(prevCount => prevCount + 5); // thêm 5 tác giả vào danh sách hiển thị
  };
  
  const handleShowLess = () => {
    setDisplayCount(INITIAL_DISPLAY_COUNT); // trở lại số lượng mặc định
  };

  const renderSidebar = () => {
    return (
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          imgUrl={user?.avatar}
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
        />

        {/* ---- */}
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{user?.fullName || 'User Name'}</h2>
          <StartRating point={parseFloat(author?.averageReviewStart?.toFixed(1) || "0")}
            reviewCount={author?.totalReviewCount} className="!text-base" />
        </div>

        {/* ---- */}
        <p className="text-neutral-500 dark:text-neutral-400">
          {user?.description}
        </p>

        {/* ---- */}
        <SocialsList
          className="!space-x-3"
          itemClass="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xl"
        />

        {/* ---- */}
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>

        {/* ---- */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {user?.address}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.050 11.293a15.802 15.802 0 007.757 7.757l2.475-2.475a1.002 1.002 0 011.11-.194 9.173 9.173 0 003.451.669 1 1 0 011 1v3.5a1 1 0 01-.928.997 17.004 17.004 0 01-14.07-14.07A1 1 0 013 2.549h3.5a1 1 0 011 1 9.173 9.173 0 00.669 3.451 1.002 1.002 0 01-.194 1.11l-2.475 2.475z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {user?.phoneNumber}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-.9 0-2-.9-2-2V6c0-1.1 1.1-2 2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M22,6l-10,7L2,6"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-neutral-6000 dark:text-neutral-300">
              Joined in {user?.created ? format(new Date(user.created), 'PP') : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">{user?.fullName}'s listings</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {user?.fullName}'s listings is very rich, 5 star reviews help him to be
            more branded.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>

            <Tab.Panels>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                {stay && stay.length > 0 ? (
                    stay.slice(0, displayCount).map((item) => (
                      <StayCard key={item.id} data={item} />
                    ))
                  ) : (
                    <div className="text-center">
                      <p>User has no stays yet.</p>
                    </div>
                  )}
                </div> 
                <div className="flex mt-11 justify-center items-center">
                  {displayCount < (stay ?? []).length && (
                    <ButtonSecondary onClick={handleShowMore}>Show me more</ButtonSecondary>
                  )}
                  {displayCount > 4 && (
                    <ButtonSecondary onClick={handleShowLess}>Show less</ButtonSecondary>
                  )}
                </div>
              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Travel || Booking</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {renderSection2()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;

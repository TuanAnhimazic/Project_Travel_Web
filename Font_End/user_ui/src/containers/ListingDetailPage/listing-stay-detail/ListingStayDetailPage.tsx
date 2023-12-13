import React, { FC, Fragment, useState, useEffect } from "react";
import CommentListing from "components/CommentListing/CommentListing";
import FiveStartIconForRate from "components/FiveStartIconForRate/FiveStartIconForRate";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import SectionDateRange from "../SectionDateRange";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createImageGallery } from "./constant";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import GuestsInput from "./GuestsInput";
import { BookingPolicy, ReviewData, StayData } from "data/types";
import { GetPolicyStay_API, GetReviewStay_API, GetStayById_API, PostReviewStay_API } from "API/Stay/Stay";
import { format } from 'date-fns';
import { useAuth } from "containers/AuthContext/AuthContext";

export interface DatesRange {
  checkInDate: Date | null;
  checkOutDate: Date | null;
}

export interface BlockedDate {
  id: number;
  startDate: Date;
  endDate: Date;
}

const StayDetailPageContainer: FC<{}> = () => {
  //
  const { id } = useParams();
  const { user } = useAuth();
  const [stayDetail, setStayDetail] = useState<StayData>();
  const [stayOfUser, setStayOfUser] = useState<number>();
  const [bookingPolicy, setBookingPolicy] = useState<BookingPolicy>();
  const [review, setReview] = useState<ReviewData[]>([]);
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const initialReviewCount = 4;
  const [visibleReviews, setVisibleReviews] = useState<number>(initialReviewCount);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const serverURL = 'https://localhost:7249/Images/';
  const imagesFromStayDetails = stayDetail ? stayDetail.galleryImgs.map(img => serverURL + img.listImage) : [];
  const [datesRange, setDatesRange] = useState<DatesRange>();
  const [guest, setGuest] = useState<number>();

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const thisPathname = useLocation().pathname;
  const router = useNavigate();

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const handleOpenModalImageGallery = () => {

    //  router(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
    const imageGallery = createImageGallery(imagesFromStayDetails);
    router(`${thisPathname}?modal=PHOTO_TOUR_SCROLLABLE`, { state: { images: imageGallery } });
  };


  useEffect(() => {
    const stayId = id ? parseInt(id, 10) : null;
    if (stayId) {
      fetchData(stayId);
    }
  }, [id]);

  useEffect(() => {
    const stayId = id ? parseInt(id, 10) : null;
    if (stayId) {
      fetchPolicy(stayId);
    }
  }, [id]);


  useEffect(() => {
    const stayId = id ? parseInt(id, 10) : null;
    if (stayId) {
      fetchReview(stayId);
    }
  }, [id]);

  const fetchData = async (id: number) => {
    try {
      const response = await GetStayById_API(id);
      const result: { success: boolean, message: string, stayOfUser: number, data: any } = response.data;
      if (result.success) {
        // console.log(" get stay by id:", result.data);
        setStayOfUser(result.stayOfUser);
        setStayDetail(result.data);
      } else {
        console.log("get stay failed:", result.message);
      }

    } catch (error) {

      console.error("Error fetching stay details:", error);
    }

  }

  const fetchPolicy = async(id: number) => {

    try {
      const response = await GetPolicyStay_API(id);
      const result: { success: boolean, message: string, data: any } = response.data;
      if (result.success) {
        
        // console.log("policy", result.data);
        setBookingPolicy(result.data);
      } else {
        console.log(" fetch policy failed: ", result.message);
      }
    } catch (error) {
      console.log("Error fetching policy:", error);
    }
  }

  const fetchReview = async (id: number) => {
    try {
      const response = await GetReviewStay_API(id);
      const result: { success: boolean, message: string, data: any } = response.data;
      if (result.success) {

        setReview(result.data);

      } else {
        console.log(" fecth review failed: ", result.message);
      }
    } catch (error) {
      console.log("Error fetching review:", error);
    }
  }

  if (!stayDetail) {
    return <div>Loading...</div>; // Hiển thị thông báo loading hoặc spinner
  }

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 1 */}
        <div className="flex justify-between items-center">
          <Badge name={stayDetail.category.propertyType} />
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {stayDetail.title}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <StartRating point={stayDetail.reviewStart != null ? parseFloat(stayDetail.reviewStart.toFixed(1)) : 1}
            reviewCount={stayDetail.reviewCount} />
          <span>·</span>
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">{stayDetail.address}</span>
          </span>
        </div>

        {/* 4 */}
        <div className="flex items-center">
          <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
            Hosted by{" "}
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">
              {stayDetail.user.fullName}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {stayDetail.maxGuest} <span className="hidden sm:inline-block">guests</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bed text-2xl"></i>
            <span className=" ">
              {stayDetail.bed} <span className="hidden sm:inline-block">beds</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-bath text-2xl"></i>
            <span className=" ">
              {stayDetail.maxBathroom} <span className="hidden sm:inline-block">baths</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className=" las la-door-open text-2xl"></i>
            <span className=" ">
              {stayDetail.maxBedroom}  <span className="hidden sm:inline-block">bedrooms</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Stay information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <span>
            {stayDetail.description}
          </span>
        </div>
      </div>
    );
  };

  const renderSection3 = () => {

    const amenities = bookingPolicy?.listAmenity || [];
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {amenities.filter((_, i) => i < 4).map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              {/* <i className={`text-3xl las ${item.icon}`}></i> */}
              <span className=" ">{item.describe}</span>
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        {amenities.length > 4 && (
          <div>
            <ButtonSecondary onClick={openModalAmenities}>
              View more amenities
            </ButtonSecondary>
          </div>
        )}
        {renderMotalAmenities()}
      </div>
    );
  };
  const renderSectionRule = () => {

    const rules = bookingPolicy?.listRule || [];
    const filteredRules = rules.filter(
      (rule) =>
        (rule.isDefaultAllowed && rule.describe) || (rule.isDefaultChargeable && rule.describe)
    );
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Rules </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's Rules and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {filteredRules.filter((_, i) => i < 4).map((item) => (
            <div key={item.id} className="flex items-center space-x-3">
              <span className=" ">{item.describe}</span>
              {item.isDefaultChargeable ? <span className="text-red-500"> (Charged)</span> : <span className="text-green-500"> (non-charged)</span>}
            </div>
          ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        {filteredRules.length > 4 && (
          <div>
            <ButtonSecondary >
              View more rules
            </ButtonSecondary>
          </div>
        )}
      </div>
    );
  };

  const renderMotalAmenities = () => {
    const amenities = bookingPolicy?.listAmenity || [];
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {amenities.filter((_, i) => i < 1212).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        <span>{item.describe}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">  Price </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Basic Price</span>
              <span>$ {stayDetail.price.basePrice} {stayDetail.price.currency}</span>
            </div>

            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Monthly rental with discount</span>
              <span>- {stayDetail.saleOff} %</span>
            </div>
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              <span>Minimum number of nights</span>
              <span>{bookingPolicy?.minNight} night</span>
            </div>
            <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
              <span>Max number of nights</span>
              <span>{bookingPolicy?.maxNight} night</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {

    const formattedDate = stayDetail.user.created
      ? format(new Date(stayDetail.user.created), 'MMMM dd, yyyy')
      : '';

    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <Avatar
            hasChecked
            hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
            sizeClass="h-14 w-14"
            radius="rounded-full"
          />
          <div>
            <a className="block text-xl font-medium" href="##">
              {stayDetail.user.fullName}
            </a>
            <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <StartRating point={stayDetail.reviewStart != null ? parseFloat(stayDetail.reviewStart.toFixed(1)) : 1}
                reviewCount={stayDetail.reviewCount} />
              <span className="mx-2">·</span>
              <span> {stayOfUser} places</span>
            </div>
          </div>
        </div>

        {/* desc */}
        <span className="block text-neutral-6000 dark:text-neutral-300">
          {stayDetail.user.description}
        </span>

        {/* info */}
        <div className="block text-neutral-500 dark:text-neutral-400 space-y-2.5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            <span>Joined in {formattedDate}</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span>Response rate - 100%</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Fast response - within a few hours</span>
          </div>
        </div>

        {/* == */}
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <ButtonSecondary href="#">See host profile</ButtonSecondary>
        </div>
      </div>
    );
  };
  const renderSection6 = () => {

    const handleLoadMoreReviews = () => {
      setVisibleReviews(prev => prev + 4); // Thêm  reviews vào số lượng hiển thị
    };
    const handleCloseReviews = () => {
      setVisibleReviews(initialReviewCount); // Thu gọn số lượng reviews hiển thị
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setComment(event.target.value);
    };
    const handleRatingChange = (newRating: number) => {
      setRating(newRating);
    };
    const handleSubmit = async () => {
      const userId = user ? user.id : null;
      if (!userId) {
        router("/login");
        return;
      }
      // Kiểm tra xem id có hợp lệ không
      const stayId = id ? parseInt(id, 10) : null;
      if (!stayId || stayId <= 0) {
        setErrorMessage("Invalid stay ID.");
        return;
      }

      if (!rating || rating <= 0) {
        setErrorMessage("Please provide a valid rating.");
        return;
      }

      if (!comment || comment.trim() === "") {
        setErrorMessage("Please provide a comment.");
        return;
      }

      const reviewData = {
        userId: userId,
        stayId: stayId,
        rating: rating,
        comment: comment,

      };

      // Gửi reviewData đến server..
      try {

        const response = await PostReviewStay_API(reviewData);
        const result: { success: boolean, message: string, data: any } = response.data;

        if (result.success) {

          console.log("post review stay:", result.message);
          console.log("data review:", result.data);
          setErrorMessage('');
          setReview(prevReviews => [...prevReviews, result.data]);

        } else {

          setErrorMessage(result.message);
        }

      } catch (error) {

        console.log(error);
        setErrorMessage("Error post review stay");

      }

    };


    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews ({stayDetail.reviewCount})</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Thông báo yêu cầu đăng nhập */}
        {!user && (
          <div className="text-center text-red-600">
            <p>Please <a href="/login" className="font-semibold underline">log in</a> to leave a review.</p>
          </div>
        )}

        {/* Thông báo lỗi */}
        {errorMessage && (
          <div className="text-red-600 text-center">
            {errorMessage}
          </div>
        )}

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate
            defaultPoint={rating}
            onRatingChange={handleRatingChange} iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
              onChange={handleCommentChange}
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
              onClick={handleSubmit}
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">

          {review.length > 0 ?
            (
              <CommentListing data={review.slice(0, visibleReviews)} className="py-8" />
            ) : (<div>There are no reviews for this place yet.</div>)}

          <div className="pt-8">
            {visibleReviews < review.length && (
              <>
                <ButtonSecondary onClick={handleLoadMoreReviews}>
                  View more reviews
                </ButtonSecondary>
                <div className="my-2"> {/* Thêm khoảng cách giữa hai nút */}</div>
              </>
            )}

            {visibleReviews > initialReviewCount && (
              <ButtonSecondary onClick={handleCloseReviews}>
                Show less
              </ButtonSecondary>
            )}
          </div>


        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    const apiKey = 'AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY';
    const destination = `${stayDetail.location.lat},${stayDetail.location.lng}`;
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${destination}`;

    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {stayDetail.location.street}, {stayDetail.location.state},{stayDetail.location.city} ({stayDetail.location.country})
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <iframe
              title="x"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
            ></iframe>
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {

    const formatTime = (time: Date | null | undefined) => {
      if (!time) return '';
      const date = new Date(time);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Things to know</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Cancellation policy</h4>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            {bookingPolicy?.policyDescription}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <h4 className="text-lg font-semibold">Check-in time</h4>
          <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
            <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <span>Check-in</span>
              <span>{formatTime(bookingPolicy?.checkInTime)}</span>
            </div>
            <div className="flex space-x-10 justify-between p-3">
              <span>Check-out</span>
              <span>{formatTime(bookingPolicy?.checkOutTime)}</span>
            </div>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      </div>
    );
  };

  const calculateNumberOfDays = (startDate: Date | null, endDate: Date | null, blockedDates: BlockedDate[] = []) => {
    if (!startDate || !endDate) {
      return 0;
    }
  
    let numberOfDays = 0;
    const oneDay = 24 * 60 * 60 * 1000; // 1 ngày trong millisecond
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const isBlocked = blockedDates.some(blockedDate => {
        const start = new Date(blockedDate.startDate);
        const end = new Date(blockedDate.endDate);
        return currentDate >= start && currentDate <= end;
      });
  
      if (!isBlocked) {
        numberOfDays++;
      }
  
      currentDate.setTime(currentDate.getTime() + oneDay);
    }
  
    return numberOfDays;
  };
  
  const renderSidebar = () => {
    const price = stayDetail?.price ;
    const basePrice = parseFloat(price.basePrice);
    const startDate = datesRange?.checkInDate || null;
    const endDate = datesRange?.checkOutDate || null;
    const numberOfDays = calculateNumberOfDays(startDate, endDate, bookingPolicy?.blockedDate);

    
    const handleDatesChange = (newDatesRange: DatesRange) => {
      setDatesRange(newDatesRange);
    };

    const handleGuestChange = (newGuest: number) =>{
      setGuest(newGuest);
    }

    const handleBooking = () => {
      console.log("datesRange", datesRange);
      console.log("guest", guest);
    }

    
    

    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            {price.basePrice} {price.currency}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>
          <StartRating point={stayDetail.reviewStart != null ? parseFloat(stayDetail.reviewStart.toFixed(1)) : 1}
            reviewCount={stayDetail.reviewCount} />
        </div>

        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput blockedDates={bookingPolicy?.blockedDate} onDatesChange={handleDatesChange} className="flex-1 z-[11]" />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput onGuestsChange={handleGuestChange} className="flex-1" />
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>{basePrice} {price.currency}  x {numberOfDays} nights</span>
            <span> $ {basePrice * numberOfDays}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{basePrice * numberOfDays} {price.currency}</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary onClick={handleBooking} href={"/checkout"}>Reserve</ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
            onClick={handleOpenModalImageGallery}
          >
            {imagesFromStayDetails.length > 0 && (
              <img
                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                src={imagesFromStayDetails[0]}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {imagesFromStayDetails.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
            <div
              key={index}
              className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""
                }`}
            >
              <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                <img
                  className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                  src={item}
                  alt=""
                  sizes="400px"
                />
              </div>

              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleOpenModalImageGallery}
              />
            </div>
          ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSectionRule()}
          {renderSection4()}
          <SectionDateRange data={bookingPolicy?.blockedDate}/>
          {renderSection5()}
          {renderSection6()}
          {renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default function ListingStayDetailPage() {
  return (
    <DetailPagetLayout>
      <StayDetailPageContainer />
    </DetailPagetLayout>
  );
}

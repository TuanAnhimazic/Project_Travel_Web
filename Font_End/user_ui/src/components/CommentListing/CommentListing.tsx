import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";


export interface ReviewData {
  id: number;
  userId: number;
  stayId: number;
  rating: number;
  comment: string;
  dateCreated: Date; 
  user:{
    userId: number;
    fullName: string;
    avatar: string;
  };
}
export interface CommentListingProps {
  className?: string;
  data?: ReviewData[];
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data,
  hasListingTitle,
}) => {
  return (
    <div className={`nc-CommentListing ${className}`} data-nc-id="CommentListing">
      {data?.map((review, index) => (
        <div key={index} className="flex space-x-4">
          <div className="pt-0.5">
            <Avatar
              sizeClass="h-10 w-10 text-lg"
              radius="rounded-full"
              userName={review.user.fullName}
              imgUrl={review.user.avatar}
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between space-x-3">
              <div className="flex flex-col">
                <div className="text-sm font-semibold">
                  <span>{review.user.fullName}</span>
                  {hasListingTitle && (
                   <span>Thông tin thêm về review</span>
                  )}
                </div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {new Date(review.dateCreated).toLocaleDateString()} {/* Hiển thị ngày tạo */}
                </span>
              </div>
              <div className="flex text-yellow-500">
                {/* Vẽ sao dựa trên số lượng rating */}
                {[...Array(5)].map((_, starIndex) => (
                  <StarIcon 
                    key={starIndex}
                    className={`w-4 h-4 ${starIndex < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
            </div>
            <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
              {review.comment} {/* Hiển thị bình luận */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
   
};

export default CommentListing;

import React, { FC, useState } from "react";
import { CardAuthor } from "data/types";
import { StarIcon } from "@heroicons/react/24/solid";
import { Link} from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import { useAuth } from "containers/AuthContext/AuthContext";

export interface CardAuthorBoxProps {
  className?: string;
  author: CardAuthor;
  index?: number;
}

const CardAuthorBox: FC<CardAuthorBoxProps> = ({
  className = "",
  author,
  index,
}) => {
  const {user} = useAuth();
  const [showAlert, setShowAlert] = useState(false)
  const { userId, fullName, href = `/author/${userId}`, avatar, averageReview, reviewCount } = author;
  const hrefUrl = userId ? href : '/author/default';

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!user) {
      e.preventDefault();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Thông báo sẽ tự đóng sau 3 giây
    } 
  };
  return (
    <>
        {showAlert && (
            <div className="alert">You need to log in to view this information.</div> 
          )}
        <Link
          onClick={handleOnClick}
          to={hrefUrl}
          className={`nc-CardAuthorBox relative flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
          data-nc-id="CardAuthorBox"
        >
          {index && (
            <Badge
              className="absolute left-3 top-3"
              color={index === 1 ? "red" : index === 2 ? "blue" : "green"}
              name={`#${index}`}
            />
          )}
          <Avatar
            sizeClass="w-20 h-20 text-2xl"
            radius="rounded-full"
            imgUrl={avatar}
            userName={fullName}
          />
          <div className="mt-3">
            <h2 className={`text-base font-medium`}>
              <span className="line-clamp-1">{fullName}</span>
            </h2>
            <span
              className={`block mt-1.5 text-sm text-neutral-500 dark:text-neutral-400`}
            >
              New York
            </span>
          </div>
          <div className="py-2 px-5 mt-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center ">
            <span className="text-xs font-medium pt-[1px]">
            {averageReview != null ? averageReview.toFixed(1) : 'No reviews'}
            </span>
            <StarIcon className="w-5 h-5 text-amber-500 ml-2 " />
            <span className="ml-2 text-xs font-medium">
              ({reviewCount || 'No reviews'}) 
            </span>
          </div>
        </Link>
    </>
    
  );
};

export default CardAuthorBox;

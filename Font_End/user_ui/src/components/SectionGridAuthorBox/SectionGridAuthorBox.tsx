import { GetFamousAuthor_API } from "API/Stay/FamousAuthor";
import CardAuthorBox from "components/CardAuthorBox/CardAuthorBox";
import CardAuthorBox2 from "components/CardAuthorBox2/CardAuthorBox2";
import Heading from "components/Heading/Heading";
import {CardAuthor } from "data/types";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: CardAuthor[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
}
const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors,
  boxCard = "box1",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ",
}) => {

  const [famousAuthors, setFamousAuthors] = useState<CardAuthor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const INITIAL_DISPLAY_COUNT = 5;
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT);


useEffect(()=>{

fetchAuthor();
},[]);

const fetchAuthor = async() =>{
  setIsLoading(true);
  try{
    const response = await GetFamousAuthor_API();
    const result:{success: boolean, message: string, data:  CardAuthor[]} = response.data;
    if(result.success){
      console.log(" Fetch famous author successfully: ", result.data);
      // Sắp xếp mảng dựa trên averageReview và reviewCount từ cao xuống thấp
      const sortedAuthors = result.data.sort((a, b) => {
        // So sánh theo averageReview trước
        if (b.averageReview !== a.averageReview) {
          return b.averageReview - a.averageReview;
        }
        // Nếu averageReview bằng nhau, so sánh theo reviewCount
        return b.reviewCount - a.reviewCount;
      });

      setFamousAuthors(sortedAuthors);
    }else{
      console.log("fetch famous author failed: ", result.message);
    }

  }catch(error){
    console.log(" an error fetch famous author failed: ", error);
  }finally{
    setIsLoading(false);
  }

}

const handleShowMore = () => {
  setDisplayCount(prevCount => prevCount + 5); // thêm 5 tác giả vào danh sách hiển thị
};

const handleShowLess = () => {
  setDisplayCount(INITIAL_DISPLAY_COUNT); // trở lại số lượng mặc định
};
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <Heading desc="Rating based on customer reviews" isCenter>
        Top {famousAuthors.length} author of the month
      </Heading>
      {isLoading  ? (
      <div>Loading...</div>
    ) : famousAuthors.length === 0 ? (
      <div>No authors found</div>
    ):(
      <div className={`grid gap-6 md:gap-8 ${gridClassName}`}>
        {famousAuthors.slice(0, displayCount).map((author, index) =>
          boxCard === "box2" ? (
            <CardAuthorBox2 key={author.userId} author={author} />
          ) : (
            <CardAuthorBox
              index={index < 3 ? index + 1 : undefined}
              key={author.userId}
              author={author}
            />
          )
        )}
      </div>
    )}
      <div className="mt-16 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-5">
        {displayCount < famousAuthors.length && (
          <ButtonSecondary onClick={handleShowMore}>Show me more</ButtonSecondary>
        )}
        {displayCount > INITIAL_DISPLAY_COUNT && (
          <ButtonSecondary onClick={handleShowLess}>Show less</ButtonSecondary>
        )}
        <ButtonPrimary href="/signup">Become a host</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridAuthorBox;

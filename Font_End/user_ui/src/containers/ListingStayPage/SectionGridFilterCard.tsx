import React, { FC, useState, useEffect } from "react";
import StayCard from "components/StayCard/StayCard";
import { StayData } from "data/types";
import Pagination from "shared/Pagination/Pagination";
import TabFilters from "./TabFilters";
import Heading2 from "components/Heading/Heading2";
import { GetStay_API } from "API/Stay/Stay";


export interface SectionGridFilterCardProps {
  className?: string;

}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = "",
}) => {

  const [stays, setStays] = useState<StayData[]>([]);
  const ITEMS_PER_PAGE = 8; // Số lượng mục hiển thị trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // numberPage
  const [totalPages, setTotalPages] = useState(1); // PageSize
  const [currentStays, setCurrentStays] = useState<StayData[]>([]);


  // console.log("listing stay:", stays);
  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        
        const response = await GetStay_API();
        const result: { success: boolean, message: string,totalCount: number, data: any } = response.data;
        if (result.success && isMounted) {
          const stayData = result.data;
         
          setTotalPages(Math.ceil(result.totalCount / ITEMS_PER_PAGE));
          setStays(stayData);

        } else if (isMounted){

          console.error(result.message || 'Error fetching stays')
        }
      } catch (error: any) {

            if (isMounted) {
              console.error(error.result?.message || error.message || 'Error fetching data');
            }
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };

  }, []);


  useEffect(() => {
    // // Tính toán tổng số trang
    // const total = Math.ceil(stays.length / ITEMS_PER_PAGE);
    // setTotalPages(total);
    // Cập nhật currentStays dựa trên trang hiện tại
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentStays(stays.slice(startIndex, endIndex));
  }, [currentPage, stays]);
  //
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>

      {stays.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {currentStays.map((stay) => (
            <StayCard key={stay.id} data={stay} />
          ))}
        </div>) : (<div>Loading...</div>)}

      <div className="flex mt-16 justify-center items-center">
        <Pagination className="mt-4" // Các lớp CSS tùy chỉnh cho Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => setCurrentPage(newPage)} />
      </div>
    </div>
  );
};

export default SectionGridFilterCard;

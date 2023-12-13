import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { FC } from "react";
import SectionGridFilterCard from "./SectionGridFilterCard";
import { Helmet } from "react-helmet";

export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>Travel || Booking</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO Phần Hero của Trang)*/}
        <SectionHeroArchivePage
          currentPage="Stays"
          currentTab="Stays"
          className="pt-10 pb-24 lg:pb-28 lg:pt-16 "
        />

        {/* SECTION (Phần Lọc và Hiển Thị Thẻ): */}
        <SectionGridFilterCard className="pb-24 lg:pb-28" /> 

        {/* SECTION 1 //(Phần Trượt Mới Các Danh Mục):*/}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories 
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingStayMapPage"
          />
        </div>
      

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox /> 
        </div>
      </div>
    </div>
  );
};

export default ListingStayPage;

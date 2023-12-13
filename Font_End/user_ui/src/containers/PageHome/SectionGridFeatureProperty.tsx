import React, { FC, ReactNode } from "react";
import { StayData } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import PropertyCardH from "components/PropertyCardH/PropertyCardH";

// OTHER DEMO WILL PASS PROPS

//
export interface SectionGridFeaturePropertyProps {
  stayListings?: StayData[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeatureProperty: FC<SectionGridFeaturePropertyProps> = ({
  stayListings = [],
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
}) => {
  const renderCard = (stay: StayData, index: number) => {
    return <PropertyCardH key={index} className="h-full" data={stay} />;
  };

  return (
    <div className="nc-SectionGridFeatureProperty relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 ${gridClass}`}
      >
        {/* {DEMO_DATA.map(renderCard)} */}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeatureProperty;

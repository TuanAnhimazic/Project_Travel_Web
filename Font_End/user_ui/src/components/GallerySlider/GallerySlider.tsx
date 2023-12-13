import Glide from "@glidejs/glide";
import useNcId from "hooks/useNcId";
import React, { FC, useEffect, useMemo } from "react";
import NcImage from "shared/NcImage/NcImage";
import NextPrev from "shared/NextPrev/NextPrev";
import { Link } from "react-router-dom";
import { GalleryImgs } from "data/types";

export interface GallerySliderProps {
  className?: string;
  galleryImgs: GalleryImgs[];
  ratioClass?: string;
  uniqueID: string;
  href?: string;
}

const GallerySlider: FC<GallerySliderProps> = ({
  className = "",
  galleryImgs,
  ratioClass = "aspect-w-4 aspect-h-3",
  uniqueID = "uniqueID",
  href = "#",
}) => {
  const UNIQUE_CLASS = `gallerySlider__${uniqueID}` + useNcId();


  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: 1,
      gap: 0,
      keyboard: false,
    });
  }, [UNIQUE_CLASS]);


  useEffect(() => {
    // Check if the element is rendered and available
    const glideElement = document.querySelector(`.${UNIQUE_CLASS}`);
    if (glideElement) {
      MY_GLIDEJS.mount();
    } else {
      console.warn("Glide root element not found:", UNIQUE_CLASS);
      return;
    }
    // Cleanup function to unmount Glide when the component unmounts
    return () => {
      if (MY_GLIDEJS && glideElement) {
        MY_GLIDEJS.destroy();
      }
    };
  }, [MY_GLIDEJS, UNIQUE_CLASS, galleryImgs]);


  const renderDots = () => {
    return (
      <div
        className="glide__bullets flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5"
        data-glide-el="controls[nav]"
      >
        {galleryImgs.map((_, i) => (
          <button
            className="glide__bullet w-1.5 h-1.5 rounded-full bg-neutral-300"
            key={i}
            data-glide-dir={`=${i}`}
          />
        ))}
      </div>
    );
  };

  const renderSliderGallery = () => {

    if (!Array.isArray(galleryImgs) || galleryImgs.length === 0) {
      return <div>No images available</div>;
    }
    return (
      <div className={`${UNIQUE_CLASS} relative group overflow-hidden`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {galleryImgs.map((item, index) => (
              <li key={index} className="glide__slide">
                <Link to={href} className={`block ${ratioClass}`}>
                  {item.listImage ? (
                    <NcImage src={`https://localhost:7249/Images/${item.listImage}`} />
                  ) : (<NcImage src="https://www.lottehotel.com/content/dam/lotte-hotel/global/common/company/saigon-hotel.jpg" />)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DOTS */}
        <div className="absolute -bottom-4 inset-x-0 h-10 bg-gradient-to-t from-neutral-900"></div>
        {renderDots()}

        {/* NAV */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex top-1/2 transform -translate-y-1/2 inset-x-2 justify-between">
          <NextPrev className="w-full justify-between" btnClassName="w-8 h-8" />
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-GallerySlider ${className}`} data-nc-id="GallerySlider">
      {renderSliderGallery()}
    </div>
  );
};

export default GallerySlider;

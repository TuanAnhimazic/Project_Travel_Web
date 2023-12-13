import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
//import imagePng from "images/travelhero2.png";

export interface SectionHero3Props {
  className?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[`15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
        <span className="sm:text-lg  xl:text-3xl md:text-xl font-semibold text-neutral-900">
        𝔀𝓮𝓵𝓬𝓸𝓶𝓮 𝓽𝓻𝓪𝓿𝓮𝓵 𝓿𝓲𝓮𝓽 𝓷𝓪𝓶 
        </span>
        <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl !leading-[115%] ">
        Vietnam at Your Fingertips <br /> Journey through the heart of Vietnam with a simple tap 
        </h2>
        <ButtonPrimary
          href="listing-stay"
          sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
        >
          Safe Travel VietNam
        </ButtonPrimary>
      </div>
      <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <img
          className="absolute inset-0 object-cover rounded-xl"
          src="https://c4.wallpaperflare.com/wallpaper/515/503/662/photography-h%E1%BA%A1-long-bay-boat-earth-wallpaper-preview.jpg"
          alt="hero"
        />
      </div>
    </div>
  );
};

export default SectionHero3;

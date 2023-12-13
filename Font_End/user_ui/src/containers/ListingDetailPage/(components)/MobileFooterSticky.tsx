import React, { useState } from "react";
import ModalReserveMobile from "./ModalReserveMobile";
import ModalSelectDate from "components/ModalSelectDate";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ButtonPrimary from "shared/Button/ButtonPrimary";

const MobileFooterSticky = () => {
  const [startDate] = useState<Date | null>(new Date("2023/02/06"));
  const [endDate] = useState<Date | null>(new Date("2023/02/23"));

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            $311
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>
          <ModalSelectDate
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {converSelectedDateToString([startDate, endDate])}
              </span>
            )}
          />
        </div>
        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;

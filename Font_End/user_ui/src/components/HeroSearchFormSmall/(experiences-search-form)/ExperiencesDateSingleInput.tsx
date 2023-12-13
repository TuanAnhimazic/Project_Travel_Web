import React, { Fragment, useState, FC } from "react";
import DatePicker from "react-datepicker";
import { Transition } from "@headlessui/react";
import ClearDataButton from "../ClearDataButton";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "components/DatePickerCustomDay";
import useOutsideAlerter from "hooks/useOutsideAlerter";

export interface ExperiencesDateSingleInputProps {
  className?: string;
  fieldClassName?: string;
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding--small ]",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/03/01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/03/16"));

  //
  const refContainer = React.createRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  useOutsideAlerter(refContainer, () => setIsOpen(false));
  //

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderInput = () => {
    return (
      <>
        <div className="flex-grow text-left">
          <span className="block xl:text-base font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Date"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {startDate ? "Date" : `Add dates`}
          </span>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        ref={refContainer}
        className={`ExperiencesDateSingleInput relative flex ${className}`}
      >
        <>
          <div
            className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none cursor-pointer ${
              isOpen ? "nc-hero-field-focused--2" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {renderInput()}
            {startDate && isOpen && (
              <ClearDataButton onClick={() => onChangeDate([null, null])} />
            )}
          </div>

          {isOpen && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            show={isOpen}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div className="absolute left-1/2 z-10 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                <DatePicker
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} />
                  )}
                  // renderDayContents={(day, date) => (
                  //   <DatePickerCustomDay dayOfMonth={day} date={date} />
                  // )}
                />
              </div>
            </div>
          </Transition>
        </>
      </div>
    </>
  );
};

export default ExperiencesDateSingleInput;

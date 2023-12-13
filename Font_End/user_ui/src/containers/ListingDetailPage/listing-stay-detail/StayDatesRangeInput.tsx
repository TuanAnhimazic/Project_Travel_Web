import React, { Fragment, useState, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import ClearDataButton from "components/HeroSearchForm/ClearDataButton";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "components/DatePickerCustomDay";

export interface DateRange {
  checkInDate: Date | null;
  checkOutDate: Date | null;
}
export interface BlockedDate {
  id: number;
  startDate: Date;
  endDate: Date;
}

export interface StayDatesRangeInputProps {
  className?: string;
  onDatesChange: (datesRange: DateRange) => void;
  blockedDates?: BlockedDate[];
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = "flex-1",
  onDatesChange,
  blockedDates,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2023/02/06")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2023/02/23"));
  //
  
  const isBlocked = (date: Date) => {
    if (!blockedDates || blockedDates.length === 0) return false;
    return blockedDates?.some(blockedDate => {
      const startDate = new Date(blockedDate.startDate);
      const endDate = new Date(blockedDate.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const renderDayContents = (day: number, date: Date) => {
    // Kiểm tra xem ngày hiện tại có bị chặn hay không
    const blocked = isBlocked(date);
    // Truyền prop `isBlocked` vào `DatePickerCustomDay`
    return <DatePickerCustomDay dayOfMonth={day} date={date} isBlocked={blocked} />;
  };

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && isBlocked(start)) return;
    if (end && isBlocked(end)) return;
    setStartDate(start);
    setEndDate(end);
     // Gọi hàm callback để cập nhật datesRange ở nơi sử dụng
     onDatesChange({ checkInDate: start, checkOutDate: end });
  };
 
  
  const renderInput = () => {

    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Add dates"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {"Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {startDate && open && (
              <ClearDataButton onClick={() => onChangeDate([null, null])} />
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
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
                   renderDayContents={renderDayContents}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;

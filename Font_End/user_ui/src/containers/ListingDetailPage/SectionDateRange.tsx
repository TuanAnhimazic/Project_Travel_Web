import DatePickerCustomDay from "components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import React, { FC, useState} from "react";
import DatePicker from "react-datepicker";

export interface BlockedDate {
  id: number;
  startDate: Date;
  endDate: Date;
}

export interface SectionDateRangeProps {
 
  data?: BlockedDate[];

}
const SectionDateRange: FC<SectionDateRangeProps> = ({
  data
}) => {

  //  const [startDate, setStartDate] = useState<Date | null>(null);
  //  const [endDate, setEndDate] = useState<Date | null>(null);


  // const onChangeDate = (dates: [Date | null, Date | null]) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  const renderSectionCheckIndate = () => {

    const isBlocked = (date: Date) => {
      if (!data) return false;
      return data?.some(blockedDate => {
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

    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          <DatePicker
            selected={null}
            onChange={() => {}}
            filterDate={isBlocked}
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
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;

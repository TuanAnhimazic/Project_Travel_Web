// import DatePickerCustomDay from "components/DatePickerCustomDay";
import DatePickerCustomHeaderTwoMonth from "components/DatePickerCustomHeaderTwoMonth";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import React, { FC, useState, ReactNode , useEffect } from "react";
import DatePicker from "react-datepicker";
import CommonLayout from "./CommonLayout";
import { useListing } from "data/ListingStayContext/ListingStayContext";


export interface PageAddListing9Props { }

export interface BlockedPeriod  {
  startDate: Date;
  endDate: Date;
};

const PageAddListing9: FC<PageAddListing9Props> = () => {
  const {updateStayData, stayData} = useListing();

  
  const [nightMin, setNightMin] = useState<number | undefined>(stayData.bookingPolicy?.minNight || 1);
  const [nightMax, setNightMax] = useState<number | undefined>(stayData.bookingPolicy?.maxNight || 10);
  const [checkInTime, setCheckInTime] = useState<Date | null>(stayData.bookingPolicy?.checkInTime || null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(stayData.bookingPolicy?.checkOutTime || null);
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>(stayData.bookingPolicy?.BlockedDate || []);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [isDataValid, setIsDataValid] = useState(false);
 

  useEffect(() => {
    const isMinNightValid = nightMin !== undefined && nightMin > 0;
    const isMaxNightValid = nightMax !== undefined && nightMin !== undefined && nightMax >= nightMin;
    const isCheckInTimeValid = checkInTime !== null;
    const isCheckOutTimeValid = checkOutTime !== null;
    setIsDataValid(
      isMinNightValid && isMaxNightValid && 
      isCheckInTimeValid && isCheckOutTimeValid  
    );
  }, [nightMin, nightMax, checkInTime, checkOutTime]);


 const handleSelectDate = (selectedDate: Date | null) => {
  if (selectedDate) {
    // Kiểm tra xem ngày được chọn có nằm trong khoảng thời gian bị block nào không
    const existingPeriodIndex = blockedPeriods.findIndex(period =>
      selectedDate >= period.startDate && selectedDate <= period.endDate
    );

    if (existingPeriodIndex > -1) {
      // Nếu ngày này nằm trong khoảng thời gian bị block, xóa khoảng thời gian đó
      const newBlockedPeriods = [...blockedPeriods];
      newBlockedPeriods.splice(existingPeriodIndex, 1);
      setBlockedPeriods(newBlockedPeriods);
    } else if (!tempStartDate) {
      // Nếu không, thiết lập ngày bắt đầu tạm thời
      setTempStartDate(selectedDate);
    } else {
      // Tạo khoảng thời gian bị block mới
      const newBlockedPeriod = { startDate: tempStartDate, endDate: selectedDate };
      setBlockedPeriods([...blockedPeriods, newBlockedPeriod]);
      setTempStartDate(null);
    }
  }
};

const renderDayContents = (day: number, date?: Date) => {
  if (date) {
    const isBlocked = blockedPeriods.some(period =>
      date >= period.startDate && date <= period.endDate
    );

    const isTempStart = tempStartDate && date.getTime() === tempStartDate.getTime();

    let dayStyle = {};
    let content: ReactNode = day; 

    if (isBlocked) {
      dayStyle = { backgroundColor: '#d9534f', color: '#fff', fontWeight: 'bold', borderRadius: '50%' };
      content = '🔒'; // Biểu tượng khóa
    } else if (isTempStart) {
      dayStyle = { backgroundColor: '#d9534f', color: '#fff', fontWeight: 'bold', borderRadius: '50%' };
      content = '🔓'; // Biểu tượng mở khóa
    } else {
      dayStyle = {
        backgroundColor: '#f0f0f0', // Màu nền mới
        color: '#333', // Màu chữ mới
        fontWeight: 'normal',
        borderRadius: '10%' // Hình dạng mới
      };
    }

    return (
      <div style={dayStyle} title={isBlocked ? 'Blocked' : isTempStart ? 'Selecting' : 'Available'}>
        {content}
      </div>
    );
  }

  return <div>{day}</div>;
};


  const handleNext = () => {
    if (!isDataValid) {
      alert("Please enter complete all the information before continuing.");
      return;
    }
    const updatedStayData = {
      ...stayData,
      bookingPolicy: {
        ...stayData.bookingPolicy,
        minNight: nightMin,
        maxNight: nightMax,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        BlockedDate: blockedPeriods,
      }
    };
  
    updateStayData(updatedStayData);
  };
  //
  return (
    <CommonLayout
      index="09"
      backtHref="/add-listing-8"
      nextHref={isDataValid ? "/add-listing-10" : "#"}
      onNext={handleNext}
      isNextDisabled ={!isDataValid}
      
    >
      <>
        <style>
          {`
            .react-datepicker__time-list {
              max-height: 200px; 
              overflow-y: auto; 
              font-weight: bold;
              background-color: #007bff; 
              color: white; 
            }       
            
          `}
        </style>
        <div>
          <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` Shorter trips can mean more reservations, but you'll turn over your
          space more often.`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-7">
          {/* ITEM */}
          <NcInputNumber label="Nights min" defaultValue={nightMin} onChange={(value) => setNightMin(value)} />
          <NcInputNumber label="Nights max" defaultValue={nightMax} onChange={(value) => setNightMax(value)} />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Check-in Time</label>
          <div > {/* Wrapper với inline style */}
            <DatePicker
              selected={checkInTime}
              onChange={date => setCheckInTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="form-input rounded-md border border-gray-300"
              placeholderText="Select Check-in Time"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-2">Check-out Time</label>
          <div >
            <DatePicker
              selected={checkOutTime}
              onChange={date => setCheckOutTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="form-input rounded-md border border-gray-300"
              placeholderText="Select Check-out Time"
            />
          </div>
        </div>


        {/*  */}
        <div>
          <h2 className="text-2xl font-semibold">Set your availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Editing your calendar is easy—just select a date to block or unblock
            it. You can always make changes after you publish.
          </span>
        </div>

        <div className="addListingDatePickerExclude">
          <DatePicker
            onChange={handleSelectDate}
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
             renderDayContents={renderDayContents}
          />
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing9;

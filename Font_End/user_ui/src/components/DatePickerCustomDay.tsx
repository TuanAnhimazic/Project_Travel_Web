import React, { FC } from "react";

interface Props {
  dayOfMonth: number;
  date?: Date | undefined;
  isBlocked: boolean;
}

const DatePickerCustomDay: FC<Props> = ({ dayOfMonth, date, isBlocked  }) => {
  const baseStyle = "flex justify-center items-center mx-auto rounded-full"; // Căn giữa và làm tròn
  const sizeStyle = "w-8 h-8"; // Đặt kích thước cho hình tròn
  const blockedStyle = "bg-red-500 text-gray"; // Màu sắc cho ngày bị chặn
  const normalStyle = "text-gray-700"; // Màu sắc cho ngày không bị chặn

  // Áp dụng style tùy thuộc vào ngày có bị chặn hay không
  const dayStyle = `${baseStyle} ${sizeStyle} ${isBlocked ? blockedStyle : normalStyle}`;
  return <span className={dayStyle}>{dayOfMonth}</span>;
};

export default DatePickerCustomDay;

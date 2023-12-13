
import React, { FC } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";

interface CustomLink {
  label: string;
  href: string;
}

export interface PaginationProps {
  className?: string;
  currentPage: number; // Trang hiện tại
  totalPages: number; // Tổng số trang
  onPageChange: (newPage: number) => void; // Callback khi người dùng chuyển trang
}

const Pagination: FC<PaginationProps> = ({ 
  className = "",
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderItem = (pag: CustomLink, index: number) => {
    if (index + 1 === currentPage) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }else{

       // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        onClick={() => onPageChange(Number(pag.label))}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        to={pag.href}
      >
        {pag.label}
      </Link>
    );
    }
  };
// Tạo mảng dữ liệu cho các trang
const paginationData: CustomLink[] = [];
for (let i = 1; i <= totalPages; i++) {
  paginationData.push({
    label: i.toString(),
    href: `#page${i}`,
  });
}
  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
       {paginationData.map((item, index) => renderItem(item, index))}
    </nav>
  );
};

export default Pagination;

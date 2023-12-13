import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps { 
  isDataAvailable?: boolean
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  disabled = false,
  isDataAvailable = true,
  ...args
}) => {
  return (
    <Button
    className={`ttnc-ButtonPrimary font-medium border  bg-primary-600 hover:bg-primary-700 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
      disabled || !isDataAvailable ? "opacity-50 cursor-not-allowed" : "text-white bg-primary-6000 hover:bg-primary-700 text-neutral-50" // Sử dụng isDataAvailable
    } ${className}`}
    {...args}
    disabled={disabled}
    
    />
  );
};

export default ButtonPrimary;

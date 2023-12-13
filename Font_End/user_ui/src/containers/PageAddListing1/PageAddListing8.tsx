import React, { FC, useState, useEffect } from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import { useListing } from "data/ListingStayContext/ListingStayContext";

export interface PageAddListing8Props {}
interface StayData {
  price:{
    basePrice: string,
    currency: string,  
  };
  saleOff: string
}
const PageAddListing8: FC<PageAddListing8Props> = () => {
 
  const {updateStayData, stayData} = useListing();
  const [currency, setCurrency] = useState<string>(stayData.price.currency);
  const [basePrice, setBasePrice] = useState<string>(stayData.price.basePrice);
  const [saleOff, setSaleOff] = useState<string>(stayData.saleOff);

  const [isDataValid, setIsDataValid] = useState(false);

  useEffect(() => {
    // Chuyển đổi chuỗi thành số và kiểm tra
    const basePriceNumber = parseFloat(basePrice);
    const saleOffNumber = parseFloat(saleOff);
    const isBasePriceValid = !isNaN(basePriceNumber) && isFinite(basePriceNumber);
    const isSaleOffValid = !isNaN(saleOffNumber) && isFinite(saleOffNumber);
    const isCurrencyValid = currency !== "";

    setIsDataValid(isCurrencyValid && isBasePriceValid && isSaleOffValid);
  }, [currency, basePrice, saleOff]);


 
  const handleNext =()=>{
    
    if (!isDataValid) {
      alert("Please enter complete and accurate pricing information before continuing.");
      return;
    }
   const updatedData:Partial<StayData>={
    price:{
      basePrice: basePrice,
      currency: currency,  
    },
    saleOff: saleOff
   }
   
   updateStayData(updatedData);

  }
  
  return (
    <CommonLayout
      index="08"
      backtHref="/add-listing-7"
      nextHref={isDataValid ? "/add-listing-9" : "#"}
      onNext={handleNext}
      isNextDisabled = {!isDataValid}
     
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Price your space</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            The host's revenue is directly dependent on the setting of rates and
            regulations on the number of guests, the number of nights, and the
            cancellation policy.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <FormItem label="Currency">
            <Select value={currency} onChange={(e)=>setCurrency(e.target.value)}>
              <option value="USD">USD</option>
              <option value="VND">VND</option>
              <option value="EURRO">EURRO</option>
            </Select>
          </FormItem>
          <FormItem label="Base price ">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input className="!pl-8 !pr-10" placeholder="0.00" value={basePrice}   onChange={(e:any)=>setBasePrice(e.target.value)}/>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">{currency}</span>
              </div>
            </div>
          </FormItem>
        
          {/* ----- */}
          <FormItem label="Long term price for discount">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">%</span>
              </div>
              <Input className="!pl-8 !pr-10" placeholder="0.00" value={saleOff}   onChange={(e:any)=>setSaleOff(e.target.value)}/>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-500">every month</span>
              </div>
            </div>
          </FormItem>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing8;

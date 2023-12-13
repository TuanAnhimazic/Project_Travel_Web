import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { AddRules_API, DeleteRule_API, GetRules_API } from "API/Stay/StayRule";
import { useListing } from "data/ListingStayContext/ListingStayContext";

export interface PageAddListing5Props { }

export interface Rule {
  id: number;
  rule: string;
  isAllowed: boolean;
  isChargeable: boolean;
};


const PageAddListing5: FC<PageAddListing5Props> = () => {
  const {updateStayData, stayData} = useListing();
  const [rules, setRules] = useState<Rule[]>(
    stayData.bookingPolicy?.listRule 
    ? stayData.bookingPolicy.listRule.map(item=>({
      id: item.stayRuleId,
      rule: item.describe,
      isAllowed: item.IsDefaultAllowed,
      isChargeable: item.IsDefaultChargeable
    })): []);
  const [newRule, setNewRule] = useState("");
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    let isMounted = true;
    const fetchRules = async () => {

      try {
        const response = await GetRules_API();
        const result: { success: boolean, message: string, data: Rule[] } = response.data;
        if (result.success) {    
          if (isMounted) {
            
           setRules(result.data);
          }
        } 
      } catch (error) {
        if (isMounted) {
          console.error("An unexpected error occurred", error);
          setError("Không thể kết nối với máy chủ. Vui lòng thử lại sau.");
        }
      }
    };

    fetchRules();
    return () => {
      isMounted = false; 
    };
  }, []);

  const [isDataValid, setIsDataValid] = useState(false);

  useEffect(() => {
    const isAnyRuleSet = rules.some(rule => rule.isAllowed || rule.isChargeable);
    setIsDataValid(isAnyRuleSet);
  }, [rules]);
  //
 
  //
  const handleAddRule = async () => {
    const MIN_LENGTH = 1; // Minimum length of the rule
    const MAX_LENGTH = 100; // Maximum length of the rule
    if (newRule.length >= MIN_LENGTH && newRule.length <= MAX_LENGTH) {
      try {
        const initData = {
          rule: newRule,
          isAllowed: false,
          isChargeable: false,

        }
        const response = await AddRules_API(initData);
        const result: { success: boolean, message: string, data: any } = response.data;
        if (result.success) {

          console.log(result.message);
          setRules([...rules, result.data]);

          setNewRule("");

        } else {
          console.log(" no valid: ", result.message);
          setError("Không thể kết nối với máy chủ. Vui lòng thử lại sau.");
        }
      } catch (error) {
        console.error("Lỗi khi thêm quy tắc: ", error);
        setError("Không thể kết nối với máy chủ. Vui lòng thử lại sau.");
      }
    } else {
      if (newRule.length < MIN_LENGTH) {
        setError("The rule cannot be empty.");
      } else if (newRule.length > MAX_LENGTH) {
        setError(`The rule cannot exceed ${MAX_LENGTH} characters.`);
      }
    }
  };

  //
  const handleDeleteRule = async (id: number) => {
    try {
      const response = await DeleteRule_API(id); 
      const result: { success: boolean; message: string } = response.data;
      if (result.success) {
        // Update the state to remove the rule from the list
        setRules(rules.filter(rule => rule.id !== id));
      } else {
        console.log("Error deleting rule:", result.message);
        setError("Không thể xóa quy tắc từ cơ sở dữ liệu.");
      }
    } catch (error) {
      console.error("Error when deleting rule: ", error);
      setError("Không thể kết nối với máy chủ để xóa quy tắc.");
    }
  };
  //
  const handleNewRuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRule(e.target.value);
  };
  //
  const handleRuleChange = (id: number, isAllowed: boolean, isChargeable: boolean) => {

    setRules(rules.map(rule => {
      // Tìm quy tắc với ID tương ứng
      if (rule.id === id) {
        return { ...rule, isAllowed, isChargeable };
      }
      // Nếu không phải quy tắc đang được cập nhật, trả lại nó mà không thay đổi
      return rule;
    }));
  };
  
  const handleNext =()=>{
    if (!isDataValid) {
      alert("Please set at least one rule before continuing.");
      return;
    }

    const restrictedOrChargeableRules = rules.filter(rule => rule.isAllowed || rule.isChargeable).map(rule => {
      return { stayRuleId: rule.id, describe: rule.rule, IsDefaultAllowed: rule.isAllowed, IsDefaultChargeable: rule.isChargeable };
    });
    const updatedStayData = {
      ...stayData,
      bookingPolicy: {
        ...stayData.bookingPolicy,
        listRule: restrictedOrChargeableRules
      }
    };
  
    updateStayData(updatedStayData);
    
  }

  const renderRadio = (
    rule: Rule,

  ) => {
    return (


      <div className="flex gap-x-4 items-center">
        {/* Radio button cho "Do not allow" */}
        <div className="flex items-center">
          <input
            checked={!rule.isAllowed && !rule.isChargeable}
            id={`Do${rule.id}`}
            name={rule.rule}
            type="radio"
            onChange={() => handleRuleChange(rule.id, false, false)}
            className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          />
          <label htmlFor={`Do${rule.id}`} className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Do not allow
          </label>
        </div>

        {/* Radio button cho "Allow" */}
        <div className="flex items-center">
          <input
            checked={rule.isAllowed}
            id={`Allow${rule.id}`}
            name={rule.rule}
            type="radio"
            onChange={() => handleRuleChange(rule.id, true, false)}
            className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          />
          <label htmlFor={`Allow${rule.id}`} className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Allow
          </label>
        </div>

        {/* Radio button cho "Charge" */}
        <div className="flex items-center">
          <input
            checked={rule.isChargeable}
            id={`Charge${rule.id}`}
            name={rule.rule}
            type="radio"
            onChange={() => handleRuleChange(rule.id, false, true)}
            className="focus:ring-primary-500 h-6 w-6 text-primary-500 border-neutral-300 !checked:bg-primary-500 bg-transparent"
          />
          <label htmlFor={`Charge${rule.id}`} className="ml-3 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Charge
          </label>
        </div>
      </div>

    );
  };
  const renderNoInclude = (rule: Rule) => {
    return (
      <div className="flex items-center justify-between py-3">
        <span className="text-neutral-6000 dark:text-neutral-400 font-medium">
        {rule.rule}
        </span>
        <i className="text-2xl text-neutral-400 las la-times-circle hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
        onClick={() => handleDeleteRule(rule.id)}></i>
      </div>
    );
  };

  return (
    <CommonLayout
      index="05"
      backtHref="/add-listing-4"
      nextHref={isDataValid ? "/add-listing-6" : "#"}
      onNext={handleNext}
      isNextDisabled = {!isDataValid}
     
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">
            Set house rules for your guests{" "}
          </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Guests must agree to your house rules before they book.
          </span>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}

          {rules.map((rule) => (
            <div key={rule.id} className="mb-4">
              <div className="block mb-4">
                <label className="text-lg font-semibold">{rule.rule}</label>
              </div>
              {renderRadio(rule)}
            </div>
          ))}

          {/* ----------- */}
          <div className=" border-b border-neutral-200 dark:border-neutral-700"></div>
          <span className="block text-lg font-semibold">Additional rules</span>
          <div className="flow-root">
            <div className="-my-3 divide-y divide-neutral-100 dark:divide-neutral-800">
              {rules.map((rule) => (
                <div key={rule.id}>
                  {renderNoInclude(rule)}
                </div>
                
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0 sm:space-x-5">
            <Input className="!h-full" placeholder="No smoking..."
              value={newRule}
              onChange={handleNewRuleChange} />
            <ButtonPrimary onClick={handleAddRule} className="flex-shrink-0">
              <i className="text-xl las la-plus"></i>
              <span className="ml-3">Add tag</span>
            </ButtonPrimary>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing5;

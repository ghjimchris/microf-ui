import React from "react";
import Button from "@/components/ui/Button";

// import images

import wbg4 from "@/assets/images/all-img/widget-bg-2.png";

import wbg6 from "@/assets/images/all-img/widget-bg-5.png";

import wbg9 from "@/assets/images/all-img/widget-bg-8.png";

import svgLine from "@/assets/images/svg/line.svg";
import svgRabit from "@/assets/images/svg/rabit.svg";
import svgGift from "@/assets/images/svg/gift.svg";

const rabitWidget = [
  {
    bg: "bg-slate-900 dark:bg-slate-800",
  },
  {
    bg: "bg-primary-500",
  },
  {
    bg: "bg-success-500",
  },
  {
    bg: "bg-info-500 ",
  },
];
const griftWidget = [
  {
    bg: "bg-slate-900 dark:bg-slate-800",
  },
  {
    bg: "bg-primary-500",
  },
  {
    bg: "bg-success-500",
  },
  {
    bg: "bg-info-500 ",
  },
  {
    bg: "bg-danger-500 ",
  },
  {
    bg: "bg-warning-500 ",
  },
];
const BasicWidget = () => {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
       
        {/* ?? end Single ?? */}
      
        {/* ?? end Single ?? */}
      
        {/* ?? end Single ?? */}
        <div
          className="bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative"
          style={{
            backgroundImage: `url(${wbg4})`,
          }}
        >
          <div className="">
            <h4 className="text-xl font-medium text-white mb-2">
              <span className="block font-normal">Good evening,</span>
              <span className="block">Mr. Dianne Russell</span>
            </h4>
            <p className="text-sm text-white font-normal">
              Welcome to Dashcode
            </p>
          </div>
        </div>
        {/* ?? end Single ?? */}
        
        {/* ?? end Single ?? */}
        <div
          className="bg-no-repeat bg-cover bg-center p-5 rounded-[6px] relative flex items-center"
          style={{
            backgroundImage: `url(${wbg6})`,
          }}
        >
         

        <div
          className="bg-no-repeat bg-cover bg-center px-5 py-8 rounded-[6px] relative flex items-center"
          style={{
            backgroundImage: `url(${wbg9})`,
          }}
        >
          <div className="flex-1">
            <div className="max-w-[180px]">
              <h4 className="text-2xl font-medium text-slate-900 mb-2">
                <span className="block text-sm dark:text-slate-800">
                  Current balance,
                </span>
                <span className="block dark:text-slate-800">$34,564</span>
              </h4>
            </div>
          </div>
          <div className="flex-none">
            <Button
              icon="heroicons-outline:eye"
              text="View details"
              btnclassName="btn-light bg-white btn-sm "
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {rabitWidget.map((item, i) => (
          <div
            className={` mt-7 p-6 relative z-[1] rounded-2xl text-white ${item.bg}`}
            key={i}
          >
            <div className="max-w-[168px]">
              <div className="widget-title">Unlimited Access</div>
              <div className="text-xs font-normal">
                Upgrade your system to business plan
              </div>
            </div>
            <div className="mt-6 mb-14">
              <button className="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm">
                Upgrade
              </button>
            </div>
            <img
              src={svgLine}
              alt=""
              className="absolute left-0 bottom-0 w-full z-[-1]"
            />
            <img
              src={svgRabit}
              alt=""
              className="absolute ltr:right-5 rtl:left-5 -bottom-4 z-[-1]"
            />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
        {griftWidget.map((item, i) => (
          <div
            className={`${item.bg}  mb-10 mt-7 p-4 relative text-center rounded-2xl text-white`}
            key={i}
          >
            <img src={svgGift} alt="" className="mx-auto relative -mt-[40px]" />
            <div className="max-w-[160px] mx-auto mt-6">
              <div className="widget-title">Unlimited Access</div>
              <div className="text-xs font-normal">
                Upgrade your system to business plan
              </div>
            </div>
            <div className="mt-6">
              <button className="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block">
                Upgrade
              </button>
            </div>
          </div>
        ))}
      </div>

 
      </div>
    </div>
  );
};

export default WelcomeWidget;

import React from "react";

type Props = {
  onClick: () => void;
  position?: "top" | "bottom";
};

export default function AppBanner({ onClick, position = "top" }: Props) {
    
  return (
    <div
      className={`fixed ${position}-0 left-0 w-full bg-gray-100 shadow-md z-50 flex justify-between items-center px-4 py-4`}
    >
      <div className="flex items-center">
        <img
          src="/app-logo.png"
          className="w-[50px] h-[50px] rounded-xl"
          alt="앱 로고"
        />
        <div className="flex flex-col justify-center ml-3">
          <span className="font-semibold text-sm md:text-base">
            내가 찾는 굿즈 앱에서
          </span>
          <span className="font-semibold text-sm md:text-base">
            편리하게 보기
          </span>
        </div>
      </div>
      <button
        onClick={onClick}
        className="rounded-xl px-4 py-2 bg-[#fa6ee4] font-semibold text-white hover:bg-gray-100 transition-colors text-sm md:text-base"
      >
        앱에서 보기
      </button>
    </div>
  );
}

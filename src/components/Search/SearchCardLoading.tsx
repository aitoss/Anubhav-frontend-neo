import React from "react";

const SearchCard = () => {
  return (
    <>
      <div className="flex flex-row x-sm:flex-col  w-full h-full justify-center items-center gap-4 p-1 animate-pulse">
        <div className="bg-[#e9e9e9] lg:w-[410px] h-[120px] lg:h-[150px] x-sm:h-[230px] md:h-[100px] w-[280px] md:w-[260px] x-sm:w-full rounded-lg"></div>
        <div className="data flex items-start lg:justify-start justify-between h-full flex-col w-full lg:gap-4 gap-2 x-sm:gap-1  ">
          <h1 className="text-[24px] bg-[#e9e9e9] x-sm:w-[100px]  w-[180px] h-[20px] sm:text-[20px] font-[500] x-sm:text-[16px] text-gray-700 hover:text-gray-800"></h1>
          <div className="author flex items-center x-sm:gap-1 gap-2">
            <div className="bg-[#e9e9e9] rounded-full w-6 h-6 x-sm:w-5 x-sm:h-5"></div>
            <a
              href="#"
              className="bg-[#e9e9e9] x-sm:w-[60px]  w-[120px] h-[12px]  font-[400] x-sm:text-[13px]  hover:text-gray-600 text-gray-700 hover:underline"
            >
              {/* {author} */}
            </a>
            {/* <span className="text-[#a0a0a0] font-[400]">|</span> */}
            <a
              href="#"
              className="bg-[#e9e9e9]  x-sm:w-[60px] w-[80px] h-[12px]  font-[400] x-sm:text-[13px] text-gray-500"
            >
              {/* {company} */}
            </a>
          </div>
          <p className="font-[300] bg-[#e9e9e9] x-sm:w-[200px] md:w-[250px] w-[400px] lg:w-[480px] xl:w-[580px] h-[30px]   text-[#616161] overflow-ellipsis line-clamp-2 justify-center">
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium doloremque deserunt placeat saepe ad, consequuntur asperiores repellat illo nostrum earum? */}
          </p>
          <div className="flex justify-between w-full items-center">
            <h2 className="text-gray-500 bg-[#e9e9e9] x-sm:w-[80px]  w-[180px] h-[12px]  font-[400] x-sm:text-[13px] "></h2>
            <div className="flex gap-2">
              <div className="bg-[#e9e9e9] w-[15px] rounded-sm h-[15px]"></div>
              <div className="bg-[#e9e9e9] w-[15px] rounded-sm h-[15px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;

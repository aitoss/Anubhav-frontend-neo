import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "/assets/images/company.png";
import { getCompanyLogoUrl } from "../../constants";

const Filter = ({ closeFilterPopUp, company, setHeaderName }) => {
  const navigate = useNavigate();
  const [currentCompany, setCurrentCompany] = useState("");
  const [show, setShow] = useState(false);
  const [sortBy, setSortBy] = useState("");

  company.sort((a, b) => b.count - a.count);

  const handleClickApply = () => {
    closeFilterPopUp();
  };

  const stopScrollPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="category1">
        <h5 className="font-[500] mb-2 text-xl">Filter by Company</h5>
        <div
          className="flex relative flex-col gap-1 max-h-[40rem] overflow-y-scroll z-50"
          onWheel={(e) => e.stopPropagation()}
        >
          {company.map((item) => (
            <div
              key={item.company}
              onClick={() => {
                setCurrentCompany(item.company);
                setHeaderName(item.company);
                navigate("/search?query=" + encodeURIComponent(item.company));
                handleClickApply();
              }}
              className={`relative flex cursor-pointer items-center justify-between rounded-md px-2 py-1 transition-all hover:bg-white ${currentCompany === item.company ? "bg-white" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-5 w-5 rounded bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${item.company ? getCompanyLogoUrl(item.company) : companyLogo
                      })`,
                  }}
                ></div>
                <h5>{item.company}</h5>
              </div>
              <h5 className="flex w-6 items-center justify-center rounded-full bg-[#e7e8ec] font-[300]">
                {item.count}
              </h5>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start">
        {/* <div
          onClick={closeFilterPopUp}
          className="bg-[#fff] text-[#212121] border px-4 py-1 rounded-md hover:bg-[#f8f8f8] font-[400] cursor-pointer transition-all"
        >
          Apply
        </div> */}
      </div>
    </>
  );
};

export default Filter;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { BACKEND_URL } from "../../constants";

const InputTag = ({ setTags, tags }: any) => {
  const [tagSuggestions, setTagSuggestions] = useState<any[]>([]);
  const [tag, setTag] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTagSuggestions = async () => {
      try {
        const response = await axios.get(BACKEND_URL + "/tags");
        setTagSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching tag suggestions:", error);
      }
    };

    fetchTagSuggestions();
  }, []);

  const handleChange = (e: any) => {
    setTag(e.target.value);
    setError("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && tag.trim() !== "") {
      e.preventDefault();
      addTag();
    }
  };

  const handleClick = () => {
    if (tag.trim() !== "") {
      addTag();
    }
  };

  const addTag = () => {
    if (tags.includes(tag.trim())) {
      setError("This tag is already added!"); // Set error message
    } else {
      setTags([...tags, tag.trim()]);
      setTag("");
      setError(""); // Clear error on successful addition
    }
  };

  const handleTagDelete = (index: any) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div>
      <div className="relative flex flex-col">
        <div className="flex w-full flex-wrap gap-2 overflow-y-auto md:w-full">
          <h4 className="text-[#212121]">Tags</h4>
        </div>
        <div className="text-md flex w-full flex-col gap-2 rounded-lg border-[1px] border-[#78788033] bg-white py-1 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full">
          {tags.length !== 0 && (
            <div className="-mb-2 flex flex-wrap gap-2 p-2 pb-0">
              {tags.map((tagItem: any, index: number) => (
                <div
                  key={index}
                  className="flex size-fit items-center justify-center rounded-full border bg-[#f0f0f0] px-2 transition-all hover:bg-[#e9e9e9]"
                >
                  <span className="text-center text-[20px] text-base font-light text-[#212121]">
                    {tagItem}
                  </span>
                  <span
                    onClick={() => handleTagDelete(index)}
                    className="ml-1 cursor-pointer text-2xl"
                  >
                    <RxCross1 className="h-[14px] items-center text-[#919191]" />
                  </span>
                </div>
              ))}
            </div>
          )}
          <input
            type="text"
            name="tag"
            list="tagSuggestions"
            className="text-md w-full rounded-lg border-0 bg-white text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:border-0 focus:outline-none focus:ring-0 focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
            placeholder="Tags relevant to your field"
            value={tag}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {/* <button
            onClick={handleClick}
            className="mt-2 self-start rounded-lg bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
            Add Tag
          </button> */}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputTag;

import React, { useEffect, useRef, useState } from "react";

export const POSITION_OPTIONS = [
  { value: "Internship", label: "Internship" },
  { value: "FullTime", label: "Full Time" },
  { value: "Interview-experience", label: "Interview Experience" },
  { value: "Hackathon", label: "Hackathon" },
  { value: "GSOC", label: "GSOC" },
  { value: "Off Campus", label: "Off Campus" },
];

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const PositionSelect = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapperRef = useRef(null);

  const selected = POSITION_OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { name: "position", value: val } });
    setOpen(false);
    setHighlight(-1);
  };

  const handleKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, POSITION_OPTIONS.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      handleSelect(POSITION_OPTIONS[highlight].value);
    }
  };

  return (
    <div className="relative flex flex-col" ref={wrapperRef}>
      <h4 className="text-[#212121]">Position</h4>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="text-md flex w-full items-center justify-between rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-left text-[#3C3C43] ring ring-transparent focus:outline-none sm:p-2 sm:text-[13px]"
      >
        <span className={selected ? "" : "text-[#3C3C4399]"}>
          {selected ? selected.label : "Select Position"}
        </span>
        <span className={`text-[#666] transition-transform ${open ? "rotate-180" : ""}`}>
          <ChevronDown />
        </span>
      </button>
      {error && <p className="px-1 text-sm text-red-500">{error}</p>}
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto overscroll-contain rounded-lg border border-[#78788033] bg-white shadow-lg"
        >
          {POSITION_OPTIONS.map((opt, idx) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt.value);
              }}
              className={`cursor-pointer px-3 py-2 text-sm text-[#212121] hover:bg-[#f5f5f5] ${
                idx === highlight ? "bg-[#f0f0f0]" : ""
              } ${opt.value === value ? "font-[500]" : ""}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PositionSelect;

import React, { useEffect, useRef, useState } from "react";
import { searchCompanies } from "../../api/companies";

const DEBOUNCE_MS = 300;

const CompanyAutocomplete = ({ value, companyId, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapperRef = useRef(null);
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  const runFetch = (q) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setLoading(true);
      try {
        const data = await searchCompanies({ q, limit: 10, signal: ctrl.signal });
        setItems(data);
      } catch (err) {
        if (err.name !== "CanceledError" && err.name !== "AbortError") {
          setItems([]);
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);
  };

  const handleFocus = () => {
    setOpen(true);
    if (items.length === 0) runFetch("");
  };

  const handleChange = (e) => {
    const v = e.target.value;
    onChange({ companyName: v, companyId: null });
    setOpen(true);
    setHighlight(-1);
    runFetch(v);
  };

  const handleSelect = (item) => {
    onChange({ companyName: item.company, companyId: item._id || null });
    setOpen(false);
    setHighlight(-1);
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      handleSelect(items[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return (
    <div className="relative flex flex-col" ref={wrapperRef}>
      <h4 className="text-[#212121]">Company Name</h4>
      <input
        required
        type="text"
        name="company"
        autoComplete="off"
        placeholder="Company's name"
        value={value || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
      />
      {companyId && (
        <span className="px-1 text-xs text-green-600">
          Linked to existing company
        </span>
      )}
      {error && <p className="px-1 text-sm text-red-500">{error}</p>}
      {open && (loading || items.length > 0) && (
        <ul
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-y-auto overscroll-contain rounded-lg border border-[#78788033] bg-white shadow-lg"
          role="listbox"
        >
          {loading && items.length === 0 && (
            <li className="px-3 py-2 text-sm text-gray-500">Searching…</li>
          )}
          {items.map((item, idx) => (
            <li
              key={item._id || `${item.company}-${idx}`}
              role="option"
              aria-selected={idx === highlight}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              className={`cursor-pointer px-3 py-2 text-sm text-[#212121] hover:bg-[#f5f5f5] ${
                idx === highlight ? "bg-[#f0f0f0]" : ""
              }`}
            >
              {item.company}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyAutocomplete;

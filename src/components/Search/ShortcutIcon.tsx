import React, { useEffect, useState } from "react";

const ShortcutIcon = () => {
  const [osShortcut, setOsShortcut] = useState("⌘K");

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("mac")) {
      setOsShortcut("⌘K");
    } else {
      setOsShortcut("Ctrl K");
    }
  }, []);

  return (
    <div
      className={`flex h-[32px] items-center justify-center text-nowrap rounded-md p-1 font-[400] text-[#b9b9b9]`}
    >
      {osShortcut}
    </div>
  );
};

export default ShortcutIcon;

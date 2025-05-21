import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="p-2 border rounded-full flex items-center justify-center transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Sun className={`h-5 w-5 ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"} transition-all`} />
        <Moon className={`absolute h-5 w-5 ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"} transition-all`} />
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}

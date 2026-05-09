import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signOut,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import { useUser } from "../../context/UserContext";
import ButtonV5 from "../ui/buttonv5";
import { profileUrl } from "../../utils/slug";

const Avatar = ({ user }) => {
  if (user?.logoUrl) {
    return (
      <img
        src={user.logoUrl}
        alt={user.name || "Profile"}
        className="block h-full w-full rounded-full object-cover"
      />
    );
  }
  const initials = (user?.name || user?.email || "?")
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="text-shadow text-xs font-[500] leading-none text-white"
      style={{ textShadow: "0 1px 1px rgba(0, 0, 0, 0.08)" }}
    >
      {initials}
    </span>
  );
};

const ProfileMenu = () => {
  const session = useSessionContext();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

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

  if (session.loading) return null;
  if (!session.doesSessionExist) {
    return (
      <Link to="/auth" className="whitespace-nowrap">
        <ButtonV5 icon={false} color="#f8f8f8">
          <h5 className="flex gap-1 whitespace-nowrap text-[16px] font-[400] -tracking-[0.2px] text-[#212121]">
            Sign in
          </h5>
        </ButtonV5>
      </Link>
    );
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  const itemClass =
    "block w-full border-0 bg-white px-4 py-2 text-left text-sm text-[#212121] hover:bg-[#f5f5f5] focus:outline-none";

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Profile menu"
        className="group relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full p-0 transition-all hover:brightness-[101%] focus:outline-none"
        style={{
          width: 36,
          height: 36,
          backgroundColor: "#212121",
          border: "1px solid #0a0a0a",
        }}
      >
        <span
          className="absolute -top-1/2 left-1/2 h-2 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-100 blur-[12px] transition-all group-hover:opacity-30"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 rounded-full border-t border-[#ffffff60]"
          aria-hidden="true"
        />
        <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
          <Avatar user={user} />
        </span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-[10000] mt-2 w-56 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-lg">
          <div className="border-b border-[#f1f1f1] bg-white px-4 py-3">
            <div className="truncate text-sm font-[500] text-[#212121]">
              {user?.name || "Your account"}
            </div>
            {user?.email && (
              <div className="truncate text-xs text-[#666]">{user.email}</div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate(user ? profileUrl(user) : "/profile/me");
            }}
            className={itemClass}
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              navigate("/profile/edit");
            }}
            className={itemClass}
          >
            Edit Profile
          </button>
          <div className="border-t border-[#f1f1f1]" />
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="block w-full border-0 bg-white px-4 py-2 text-left text-sm text-red-600 hover:bg-[#fef2f2] focus:outline-none disabled:opacity-60"
          >
            {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

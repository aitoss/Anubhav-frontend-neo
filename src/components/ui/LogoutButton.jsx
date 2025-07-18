import React, { useState } from "react";
import {
  signOut,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";
import ButtonV5 from "./buttonv5";

const LogoutButton = () => {
  const { doesSessionExist } = useSessionContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!doesSessionExist) return null;

  return (
    <ButtonV5
      icon={false}
      color="#f8f8f8"
      disabled={loading}
      onClick={handleLogout}
    >
      <h5 className="flex gap-1 text-[16px] font-[400] -tracking-[0.2px] text-[#212121]">
        {loading ? "Logging out..." : "Logout"}
      </h5>
    </ButtonV5>
  );
};

export default LogoutButton;

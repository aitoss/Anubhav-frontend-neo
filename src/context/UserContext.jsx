import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { getMe } from "../api/me";

const UserContext = createContext({
  user: null,
  loading: true,
  refetchUser: () => {},
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const session = useSessionContext();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetchUser = useCallback(async () => {
    try {
      const u = await getMe();
      setUser(u);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session.loading) return;
    if (session.doesSessionExist) {
      refetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session.loading, session.doesSessionExist, refetchUser]);

  return (
    <UserContext.Provider value={{ user, loading, refetchUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

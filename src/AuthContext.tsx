"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "./types";
import { getMyUser } from "./service";

export type AuthContextType = {
  user: User | null;
  refreshUser: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  refreshUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const user = await getMyUser();
      user.favorites = [
        {
          _id: "3",
          name: "Candidate 1",
          biography: "",
          comments: [],
          electoralProgram: "",
          votes: 0,
        },
      ];
      setUser(user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          refreshUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => useContext(AuthContext);

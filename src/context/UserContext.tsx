import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "@/types/UserType";
import { PropsWithChildren } from "react";
import axios from "axios";

type UserContextType = [UserType | null, () => void];

const UserContext = createContext<UserContextType>([null, async () => {}]);

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5005/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, fetchUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

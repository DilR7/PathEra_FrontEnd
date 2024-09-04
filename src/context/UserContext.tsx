import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "@/types/UserType";
import { PropsWithChildren } from "react";
import axios from "axios";
import { BASE_URL } from "@/config/settings";

type UserContextType = [UserType | null, () => Promise<void>, boolean];

const UserContext = createContext<UserContextType>([
  null,
  async () => {},
  true,
]);

export function UserProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        localStorage.removeItem("token");
      }
      console.log(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, fetchUser, loading]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

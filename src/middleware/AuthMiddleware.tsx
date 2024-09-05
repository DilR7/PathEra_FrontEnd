import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { PropsWithChildren } from "react";

const AuthMiddleware = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, fetchUser, loading] = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      if (user === null && !loading) {
        await fetchUser();
      }

      if (user === null && !loading) {
        navigate("/login");
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return null;
  }

  if (user === null) {
    navigate("/login");
  }

  return <>{children}</>;
};

export default AuthMiddleware;

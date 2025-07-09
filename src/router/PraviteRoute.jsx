import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.users.user);

  const allowedEmails = ["admin@gmail.com", "administrator@gmail.com"];

  if (!allowedEmails.includes(user?.email?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return children;
};

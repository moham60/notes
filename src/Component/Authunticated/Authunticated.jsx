import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Authunticated({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

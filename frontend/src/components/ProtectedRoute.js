import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ isLoggedIn, element, isLoading }) => {
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }
  return isLoggedIn ? element : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;

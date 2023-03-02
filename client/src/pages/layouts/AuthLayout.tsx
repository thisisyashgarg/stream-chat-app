import { Outlet, useLocation } from "react-router-dom";
import FullScreenCard from "../../components/FullScreenCard";
import Link from "../../components/Link";

const AuthLayout = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <Outlet />
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <Link to={isLogin ? "/signup" : "/login"}>
          {isLogin ? "Create Account" : "Login"}
        </Link>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
};

export default AuthLayout;

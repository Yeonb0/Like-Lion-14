import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//로그인 상태면 그대로 반환, 로그인 안된 상태면 로그인 페이지로 이동
const LoginGuard = (_WrappedComponent) => {
  const WrappedComponent = _WrappedComponent;
  return function Guard(props) {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login", { replace: true });
      }
    }, []);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default LoginGuard;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LoginButton() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  setIsLogin(!!accessToken);
}, [pathname]);

 const handleLogout = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("logout failed");
    }

    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    setIsLogin(false);

    navigate("/login"); // optional
  } catch (error) {
    console.error("Logout error:", error);
  }
};

  if (pathname === "/login" || pathname === "/write") {
    // 로그인 페이지나 글쓰기 페이지에서는 버튼을 보여주지 않음
    return null;
  }

  return (
    <>
      {isLogin ? (
        <Button onClick={() => handleLogout()}>로그아웃</Button>
      ) : (
        <Button onClick={() => navigate("/login")}>로그인</Button>
      )}
    </>
  );
}

const Button = styled.button`
  display: flex;
  padding: 0.7rem 1.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--line-secondary);
  background-color: transparent;
  cursor: pointer;

  //Text
  color: var(--text-brand);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.429; /* 2rem */
  letter-spacing: 0.0203rem;

  &:hover {
    background-color: var(--background-secondary);
  }
`;

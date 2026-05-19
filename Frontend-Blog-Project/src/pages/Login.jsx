import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
// 아래는 눈 아이콘! 비밀번호 입력란 옆에 표시할 예정. 
import {
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

export default function Login() {
  const navigate = useNavigate();

 // TODO: 로그인 폼과 관련된 상태를 관리하기 위한 useState 훅들을 추가하세요
 // 1. id, setId
 // 2. password, setPassword
 // 3. isPasswordVisible, setIsPasswordVisible (비밀번호 표시 여부)
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // TODO: 4. isPasswordVisible 값에 따라 표시할 아이콘을 결정하세요.
  const EyeIcon = isPasswordVisible ? IoEyeOffOutline : IoEyeOutline;

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력하세요");
      return;
    }
    try {
      // TODO: 10. response 변수를 채워주세요! 로그인 API 호출 결과를 저장할 예정입니다.
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loginId: id, password }),
      });
    

      if (!response.ok) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
        throw new Error("something went wrong");
      }

      const result = await response.json();
      localStorage.setItem("accessToken", result.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }
  return (
    <LoginForm
      onSubmit={handleSubmit}
    >
      <h1>로그인</h1>

      <label htmlFor="id">
        <span>아이디</span>

        <input
          id="id"
          type="text"
          placeholder="아이디를 입력하세요"

          //  TODO 6: 입력값이 변경될 때 id state를 업데이트하세요.
          onChange={(e) => setId(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        <span>비밀번호</span>

        
        <input
          id="password"

          // TODO 5: isPasswordVisible 값에 따라 type을 password/text로 변경하세요.
          type={isPasswordVisible ? "text" : "password"}

          placeholder="비밀번호를 입력하세요"

          // TODO 7: 입력값이 변경될 때 password state를 업데이트하세요.
          onChange={(e) => setPassword(e.target.value)}
        />

        <EyeIcon
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            size={20}
            color="var(--icon-tertiary)"
            style={{
                position: "absolute",
                right: "1.6rem",
                top: "50%",
                cursor: "pointer",
            }}
            />
      </label>

      <button
        type="submit"
      >
        로그인
      </button>
    </LoginForm>
  );
}

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--text-primary);
    text-align: center;
    margin-bottom: 2.4rem;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    position: relative;
    span {
      font-size: 1.6rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    input {
      padding: 1.2rem;
      border-radius: 0.8rem;
      border: 1px solid var(--line-secondary);
      background-color: transparent;
      font-size: 1.6rem;
      color: var(--text-primary);
    }
  }

  button {
    padding: 1.2rem;
    border-radius: 0.8rem;
    border: none;
    background-color: var(--button-primary);
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    cursor: pointer;
  }
`;


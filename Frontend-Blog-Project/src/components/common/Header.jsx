import styled from "styled-components";
import logo from "../../../public/BlogLogo.svg";
import LoginButton from "./LoginButton";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <img src={logo} onClick={() => navigate("/")} />
        <LoginButton />
      </HeaderWrapper>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: sticky; */
  /* top: 0; */
  background-color: var(--background-primary);
  z-index: 1000;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 74.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem 1.2rem 2rem;

  > svg {
    /* 로고 svg */
    cursor: pointer;
  }
`;

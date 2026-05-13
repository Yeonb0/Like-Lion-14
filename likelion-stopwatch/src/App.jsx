import Timer from "./components/Timer";
import Record from "./components/Record";
import { useState } from "react";
import styled from "styled-components";

const getFormattedDate = () => {
  const date = ['월', '화', '수', '목', '금', '토', '일'];
  const now = new Date();

  return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${date[now.getDay() - 1]}요일`;
}

function App() {
  const [records, setRecords] = useState([]);

  const handleRecords = (count) => {
    setRecords((prev) => [...prev, count]);
  }
  
  return (
    <AppContainer>
      <h3>🦁오늘은 {getFormattedDate()} 입니다🦁</h3>
      <Timer handleRecords = {handleRecords} />
      <Record records = {records} />
    </AppContainer>
  )
}

export default App

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 120px;
  padding: 90px;
  background-color: #010101;
  min-height: 100vh;
  color: white;
  & h3 {
    font-size: 24px;
  }
`
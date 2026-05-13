import { useState, useRef, useEffect } from "react"
import { CircleBox } from "./CircleBox";
import styled from "styled-components";

function Timer({ handleRecords }) {
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [isPaused]);
  return (
    <Container>
      <CircleBox isPaused={isPaused} />        {/* ✅ Container의 직접 자식으로 이동 */}
      <ContentWrapper>
        <TimeText>
          {String(Math.floor(count / 3600)).padStart(2, "0")}:
          {String(Math.floor(count / 60)).padStart(2, "0")}:
          {String(Math.floor(count % 60)).padStart(2, "0")}
        </TimeText>

        <StyledBtn onClick={() => {setIsPaused(!isPaused)}}>
          {isPaused ? "시작" : "중지"}
        </StyledBtn>

        <StyledBtn onClick={() => {handleRecords(count)}}>
          기록
        </StyledBtn>
      </ContentWrapper>
    </Container>
  ) 
}

export default Timer

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: 300px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1;
  position: relative;
`

const TimeText = styled.span`
  font-size: 50px;
  font-weight: bold;
`

const StyledBtn = styled.button`
  outline: none;
  background-color: #3d3d3d;
  border: none;
  color: white;
  border-radius: 20px;
  padding: 8px 20px;
  width: 100px;
  &:hover {
    cursor: pointer; 
  }`

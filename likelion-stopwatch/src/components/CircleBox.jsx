import { useState, useRef, useEffect } from "react"
import styled from "styled-components";

export function CircleBox({ isPaused = true }) {
  const [degree, setDegree] = useState(0);
  const time = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setDegree((time.current / 3000) * 360)
        time.current = time.current + 10 === 3000 // 3000이 되면 0으로, 아니면 10 증가
          ? 0
          : time.current + 10
      }, 10)
    }
    return () => { clearInterval(intervalRef.current) }  
  }, [isPaused]);

  return (
    <CircleWrapper degree={degree}>
      <Circle>
        <Dot />
      </Circle>
    </CircleWrapper>
  )
}

const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 300px;
  height: 300px;
  transform: rotate(${(props) => props.degree}deg);
  pointer-events: none; 
`

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: none;
  border: 10px solid #3d3d3d;
  box-sizing: border-box;   // ✅ border가 width 안에 포함되도록
`
  
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ff492d;
  position: absolute;
  left: 50%;
  top: calc(50% - 145px);
  transform: translate(-50%, -50%);
`


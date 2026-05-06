import React, { useState, useRef } from "react";

function CounterExample() {
  // useState: 값이 변경되면 리렌더링 발생
  const [stateCount, setStateCount] = useState(0);

  // useRef: 값이 변경되어도 리렌더링되지 않음
  const refCount = useRef(0);

  // 일반 변수: 리렌더링되면 값이 초기화됨
  let varCount = 0;

  return (
    <div>
      <p>stateCount : {stateCount}</p>
      <p>refCount : {refCount.current}</p>
      <p>varCount : {varCount}</p>

      <button onClick={() => setStateCount(stateCount + 1)}>state up</button>
      <button
        onClick={() => {
          refCount.current += 1;
          console.log("refCount:", refCount.current);
        }}
      >
        ref up
      </button>
      <button
        onClick={() => {
          varCount += 1;
          console.log("varCount:", varCount);
        }}
      >
        var up
      </button>
    </div>
  );
}

export default CounterExample;

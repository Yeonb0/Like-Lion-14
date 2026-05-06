import React, { useRef, useState } from 'react'

const ClickCounter = () => {
  const [, forceUpdate] = useState(0);
  const count = useRef(0);

  const handleClick = () => {
    count.current += 1;
    console.log(`${count.current}`); // 값 확인)
  };

  const onClickForceUpdate = () => {
    forceUpdate((prev) => prev + 1);
  };

  return(
    <div>
      <button onClick={handleClick}>Count 증가 버튼</button>
      <p>count: {count.current}</p>
      <button onClick={onClickForceUpdate}>리렌더링 유발 버튼</button>
    </div>
  )
}

export default ClickCounter
import React, { useState } from 'react'
import NewChild from './NewChild';

const NewParent = () => {
  const [count, setCount] = useState(0);
  let alpha = 5;

  console.log("Parent (리)렌더링!")
  
  const changeAlpha = () => {
    alpha = alpha + 10;
  };

  return(
    <div>
      <h1>부모 컴포넌트</h1>
      <button onClick={()=>setCount((prev) => prev + 1)}>카운트 증가</button> 
      <button onClick={changeAlpha}>alpha 10 증가</button>
      <button onClick={() => console.log(alpha)}>alpha 확인 in parent</button>
      <NewChild text="Hello World" alpha={alpha} />
    </div>
    
  )
}

export default NewParent
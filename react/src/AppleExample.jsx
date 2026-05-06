import React, { useState } from 'react'

const AppleExample = () => {
  const [apple, setApple] = useState(100);

  const changeApple = () => {
    setApple((prev) => prev - 20);
    console.log(apple);
  };

  return(
    <div>
      <span>apple: {apple}</span>
      <button onClick={changeApple}>20개 팔기</button>
    </div>
  )
}

export default AppleExample
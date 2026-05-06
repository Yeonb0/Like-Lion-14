import React from 'react'
import Child from './Child';

const Parent = () => {
  const message = "React는 신기방기";
  const userName = "홍길동";

  return(
    <div>
      <h1>부모 컴포넌트</h1>
      <Child message={message} userName={userName}>
        <p>저는 props로 전달된 HTML 자식입니다!</p>
      </Child>
    </div>
  )
}

export default Parent
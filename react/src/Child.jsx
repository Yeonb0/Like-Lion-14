import React from 'react'

const Child = ({ userName = "김첨지", message, children }) => {
  return(
    <div>
      <h2>자식 컴포넌트</h2>
      <p>{userName}: {message}</p>
      {children}
    </div>
  )
}

export default Child
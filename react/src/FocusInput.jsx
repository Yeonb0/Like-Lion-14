import React, { useRef } from 'react'

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    console.log(inputRef.current); // input 요소에 접근하여 콘솔에 출력
    inputRef.current.focus(); // input 요소에 포커스 설정
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder='Type something'/>
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  )
}

export default FocusInput
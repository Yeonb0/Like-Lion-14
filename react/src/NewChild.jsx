import React, { useState } from 'react'

const NewChild = ({ text, alpha }) => {
  const [name, setName] = useState("마동석");

  console.log("Child (리)렌더링!")

  const changeName = () => {
    if (name === "마동석") {
      setName("마동팔");
    } else {
      setName("마동석");
    }
  };

  return (
    <div>
      <button onClick={changeName}>이름 변경</button>
      <button onClick={() => console.log(alpha)}>
        alpha 확인 in child
      </button>
      <p>{text}</p>
      <p>{alpha}</p>
      <p>{name}</p>
    </div>
  )
}

export default NewChild
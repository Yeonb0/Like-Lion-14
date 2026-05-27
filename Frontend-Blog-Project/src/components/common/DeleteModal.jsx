import styled from "styled-components";

const DeleteModal = ({ isPost, handleCancelBtn, handleDeleteBtn }) => {
  return (
    <ModalContainer>
      <Information>
        <p>{isPost ? "게시글" : "댓글"} 삭제</p>
        <p>{isPost ? "게시글" : "댓글"}을 삭제합니다.</p>
      </Information>
      <Actions>
        <button onClick={handleCancelBtn}>취소</button>
        <button onClick={handleDeleteBtn}>삭제하기 </button>
      </Actions>
    </ModalContainer>
  );
};

export default DeleteModal;

const ModalContainer = styled.div`
  width: 32rem;
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  background: var(--background-primary);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 2rem;

  p:first-child {
    color: var(--text-primary);
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 150%;
  }

  p:last-child {
    color: var(--text-tertiary);
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 150%;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;
  padding: 0 2rem 1.2rem 2rem;

  button {
    padding: 0.4rem 0;
    border: none;
    background: none;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 142.9%;
    cursor: pointer;
  }

  button:first-child {
    color: var(--text-tertiary);
  }

  button:last-child {
    color: var(--text-negative);
  }
`;
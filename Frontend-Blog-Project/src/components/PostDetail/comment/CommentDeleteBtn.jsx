import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import DeleteModal from "../../common/DeleteModal";

const CommentDeleteBtn = ({ commentId, refreshPostData }) => {
  const [renderModal, setRenderModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleDeleteComment = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert(error.message);
      setRenderModal(false);
    } finally {
      refreshPostData();
    }
  };

  // TODO: handleDelete, handleCancelBtn 함수도 작성해보세요!
  // PostDeleteBtn의 함수를 참고하면 됩니다.
    const handleDelete = () => {
    setIsVisible(true);
    setRenderModal(true);
  };

  const handleCancelBtn = () => {
    setTimeout(() => {
      setRenderModal(false);
    }, 200);
    setIsVisible(false);
  };

  return (
    <>
      {/* TODO: StyledModal과 DeleteModal도 추가해보세요! */}
      {/* 힌트: isPost={false} 로 전달하면 "댓글 삭제" 텍스트가 나옵니다 */}
      <StyledModal $isVisible={isVisible}>
        {renderModal && (
          <DeleteModal
            isPost={false}
            handleDeleteBtn={handleDeleteComment}
            handleCancelBtn={handleCancelBtn}
          />
        )}
      </StyledModal>
      <Button onClick={() => handleDelete()}>
        <StyledIcon />
      </Button>
    </>
  );
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 0.5rem;

  &:hover {
    background-color: var(--surface-primary);
  }
`;

const StyledIcon = styled(IoTrashOutline)`
  font-size: 2rem;
  color: var(--icon-tertiary);
`;

const StyledModal = styled.div`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default CommentDeleteBtn;

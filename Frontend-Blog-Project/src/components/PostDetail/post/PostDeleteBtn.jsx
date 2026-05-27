import { useState } from "react";
import styled from "styled-components";
import DeleteModal from "../../common/DeleteModal";
import { useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";

const PostDeleteBtn = ({ data }) => {
  const [renderModal, setRenderModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const deletePost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/articles/${data?.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const parsedData = await response.json();

      if (!response.ok) {
        throw new Error(parsedData.message || "something went wrong");
      }

      alert("게시글이 삭제되었습니다.");
      setRenderModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting article data:", error);
      alert(error.message);
      setRenderModal(false);
    }
  };

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
      <StyledModal $isVisible={isVisible}>
        {renderModal && (
          <DeleteModal
            isPost={true}
            handleDeleteBtn={deletePost}
            handleCancelBtn={handleCancelBtn}
          />
        )}
      </StyledModal>

      <StyledIcon onClick={handleDelete} />
    </>
  );
};

export default PostDeleteBtn

const StyledIcon = styled(IoTrashOutline)`
  font-size: 2rem;
  color: var(--icon-tertiary);
  cursor: pointer;
`;

const StyledModal = styled.div`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
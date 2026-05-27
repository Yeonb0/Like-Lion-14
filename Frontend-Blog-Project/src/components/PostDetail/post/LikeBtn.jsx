import styled from "styled-components";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const LikeBtn = ({ data, refreshPostData }) => {
  const [isLiked, setIsLiked] = useState(data?.isLiked);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/likes/${data?.id}`, {
        method: isLiked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      // 현재 상태 반전
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Error fetching like API:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      refreshPostData(); // 성공 | 실패 상관 없이 최신 데이터 받아옴
    }
  };

  return (
    <LikeButton onClick={handleLikeClick} $isLiked={isLiked}>
      {isLiked ? <StyledFilledIcon /> : <StyledOutlineIcon />}
      <span>좋아요</span>
      <span>{data?.totalLikes}</span>
    </LikeButton>
  );
};

export default LikeBtn;

const LikeButton = styled.button`
  display: flex;
  padding: 0.7rem 1.4rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: 0.8rem;
  border: 1px solid
    ${(props) => (props.$isLiked ? "var(--line-brand)" : "var(--line-primary)")};
  background: none;
  color: ${(props) =>
    props.$isLiked ? "var(--icon-brand)" : "var(--icon-tertiary)"};
  width: fit-content;
  cursor: pointer;

  > span {
    color: ${(props) =>
      props.$isLiked ? "var(--text-brand)" : "var(--text-tertiary)"};
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 150%;
  }
`;

const StyledFilledIcon = styled(IoHeart)`
  font-size: 1.6rem;
  cursor: pointer;
`;

const StyledOutlineIcon = styled(IoHeartOutline)`
  font-size: 1.6rem;
  cursor: pointer;
`;

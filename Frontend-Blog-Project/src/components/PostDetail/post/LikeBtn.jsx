import styled from "styled-components";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const LikeBtn = () => {

  return (
    <LikeButton>
        <StyledOutlineIcon />
      <span>좋아요</span>
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
    ${(props) => (props.isLiked ? "var(--line-brand)" : "var(--line-primary)")};
  background: none;
  color: ${(props) =>
    props.isLiked ? "var(--icon-brand)" : "var(--icon-tertiary)"};
  width: fit-content;
  cursor: pointer;

  > span {
    color: ${(props) =>
      props.isLiked ? "var(--text-brand)" : "var(--text-tertiary)"};
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

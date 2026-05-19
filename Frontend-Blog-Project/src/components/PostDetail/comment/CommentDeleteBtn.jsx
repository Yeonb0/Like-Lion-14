import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";

const CommentDeleteBtn = () => {

  return (
    <>
      <Button>
        <StyledIcon/>
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

export default CommentDeleteBtn;

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";

const PostEditBtn = ({ data }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/write", { state: { post: data }});
  };

  return <StyledIcon onClick={handleEdit} />;
};

export default PostEditBtn;

const StyledIcon = styled(MdEdit)`
  font-size: 2rem;
  color: var(--icon-tertiary);
  cursor: pointer;
`;
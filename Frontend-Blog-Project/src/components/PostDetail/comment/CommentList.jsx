import CommentDeleteBtn from "./CommentDeleteBtn";
import styled from "styled-components";
import { formatKoreanDate } from "../../../utils/dateFormat";

const CommentList = ({ commentList = []}) => {
  return (
    <CommentListWrapper>
      {commentList.map((el) => (
        <CommentBox key={el.id}>
          <CommentBody>
            <h1>{el.author}</h1>
            <h3>{el.content}</h3>
          </CommentBody>
          <CommentFooter>
            <p>{formatKoreanDate(el.createdAt)}</p>
            <CommentDeleteBtn
              commentId={el.id}
            />
          </CommentFooter>
        </CommentBox>
      ))}
    </CommentListWrapper>
  );
};

export default CommentList;

const CommentListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 1.2rem 1.6rem;
  border-radius: 1rem;
  background-color: var(--background-secondary, #f8f9fa);
  box-shadow: var(--shadow-1);
`;

const CommentBody = styled.div`
  h1 {
    color: var(--text-primary);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: 0.085px;
  }

  h3 {
    color: var(--text-primary, #171719);
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 22.5px */
    letter-spacing: 0.085px;
  }
`;

const CommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: var(--text-tertiary, #878a93);
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: 138.5%; /* 18.005px */
    letter-spacing: 0.252px;
  }
`;

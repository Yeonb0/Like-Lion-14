import styled from "styled-components";
import { formatKoreanDate } from "../../../utils/dateFormat";

import LikeBtn from "./LikeBtn";


const PostContent = ({data}) => {

  return (
    <PostContentWrapper>
      <Header>
        <Title>제목</Title>
        <DetailInfo>
          <Author>글쓴이</Author>
          <UploadedDate>생성날짜</UploadedDate>
        </DetailInfo>
      </Header>
      <Content>내용</Content>
      <BtnSection>
        <LikeBtn data={data} />
        <BtnWrapper>
          {/* TODO : PostEditBtn, PostDeleteBtn */}
        </BtnWrapper>
      </BtnSection>
    </PostContentWrapper>
  );
};

export default PostContent;

const PostContentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--text-primary);
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Author = styled.span`
  color: var(--text-secondary);
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 150%;
`;

const UploadedDate = styled.span`
  color: var(--text-tertiary);
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 138.5%;
`;

const Content = styled.pre`
  color: var(--text-primary);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 150%;
  padding: 6rem 0;
`;

const BtnSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 1.2rem;
`;

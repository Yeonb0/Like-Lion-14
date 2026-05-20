import styled from "styled-components";

export default function ContentSection({ content, onChangeContent }) {
  return (
    <ContentSectionWrapper>
      <label htmlFor="contentInput">내용</label>
      <textarea
        id="contentInput"
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={onChangeContent}
      />
    </ContentSectionWrapper>
  );
}

const ContentSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: 74.4rem;

  > label {
    color: var(--text-tertiary, #878a93);

    /* label/medium-bold */

    font-size: 1.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 142.9%; /* 2.0006rem */
    letter-spacing: 0.0203rem;
  }

  > textarea {
    display: flex;
    padding: 1.2rem 1.6rem;
    min-height: 26.4rem;
    resize: none;
    align-items: center;
    align-self: stretch;

    border-radius: 1rem;
    border: 1px solid var(--surface-secondary, rgba(112, 115, 124, 0.16));
  }
`;

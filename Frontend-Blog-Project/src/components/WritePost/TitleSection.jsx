import styled from "styled-components";

export default function TitleSection({ title, onChangeTitle }) {
  return (
    <TitleSectionWrapper>
      <label htmlFor="titleInput">제목</label>
      <input
        id="titleInput"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onChangeTitle}
      />
    </TitleSectionWrapper>
  );
}

const TitleSectionWrapper = styled.section`
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

  > input {
    display: flex;
    padding: 1.2rem 1.6rem;
    align-items: center;
    align-self: stretch;

    border-radius: 1rem;
    border: 1px solid var(--surface-secondary, rgba(112, 115, 124, 0.16));
  }
`;

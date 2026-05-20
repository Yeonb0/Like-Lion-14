import styled from "styled-components";

export default function WriteButton({ disabled, isEdit }) {
  return (
    <WriteButtonWrapper type="submit" disabled={disabled} $disabled={disabled}>
      {isEdit ? "수정하기" : "작성하기"}
    </WriteButtonWrapper>
  );
}

const WriteButtonWrapper = styled.button`
  width: 100%;
  max-width: 74.4rem;
  padding: 1.2rem 1.6rem;
  transition: background-color 0.3s ease-in-out;

  border-radius: 1rem;
  border: none;
  background: ${({ $disabled }) =>
    $disabled
      ? "var(--button-disable, #f4f4f5)"
      : "var(--button-primary, #005fcc)"};

  color: ${({ $disabled }) =>
    $disabled ? "var(--icon-quaternary, #c2c4c8)" : "#fff"};
  text-align: center;

  text-align: center;

  /* label/large-bold */

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: 142.9%; /* 2.2864rem */
  letter-spacing: 0.0232rem;

  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;
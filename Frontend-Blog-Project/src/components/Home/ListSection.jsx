import styled from "styled-components";
import ListItem from "./ListItem";

export default function ListSection({ posts }) {
  return (
    <ListSectionWrapper>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} {...post} postId={post.id} />
        ))}
      </List>
    </ListSectionWrapper>
  );
}

const ListSectionWrapper = styled.section`
  width: 100%;
  max-width: 74.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const List = styled.ul`
  > li {
    border-bottom: 1px solid var(--line-secondary);
  }
`;

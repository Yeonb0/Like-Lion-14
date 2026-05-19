import styled from "styled-components";
import HeaderSection from "../components/Home/HeaderSection";
import ListSection from "../components/Home/ListSection";
import { useEffect, useState } from "react";
// import {mockup} from "../components/Home/data";

export default function Home() {
  const [posts, setPosts] = useState([]); 
  const [filter, setFilter] = useState("최신순"); // 최신순이 기본값

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
    async function fetchPosts() {
      try {
	      // ✅ TODO: response 변수를 채워주세요! -> 완료
        const response = await fetch(`${import.meta.env.VITE_API_URL}/articles`, {
        });

        if (!response.ok) {
          throw new Error("something went wrong");
        }
        const data = await response.json();
        setPosts(data.data.reverse()); // 최신 글 위로 올리기
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  const sortPostData = () => {
      return [...posts].sort((a,b) => {
        if(filter === "최신순") {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else if (filter === "인기순") {
          return b.totalLikes - a.totalLikes;
      } else if (filter === "댓글순") {
        return b.totalComments - a.totalComments;
      }
      return 0;
    });
  };

  const sortedPosts = sortPostData();

  return (
    <HomeContainer>
      <div>
        <HeaderSection filter={filter} setFilter={setFilter} />
        <ListSection posts={sortedPosts} />
      </div>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
    max-width: 74.4rem;
    display: flex;
    gap: 0.8rem;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }
`;

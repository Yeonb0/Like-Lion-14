import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoChevronDown } from "react-icons/io5";

const orders = ["최신순", "인기순", "댓글순"];

export default function HeaderSection({ filter, setFilter }) {
  // TODO 1: props로 {filter, onChangeFilter} 받아오기!! -> 완료
  const navigate = useNavigate();



  // TODO 2: order 관리하기
  const [showOrders, setShowOrders] = useState(false);
  const onClickOrder = () => {
    setShowOrders(!showOrders);
  };

  const onClickWriteButton = () => {
    navigate("/write");
  };

  return (
    <HeaderSectionWrapper>
      <div>
        <div className="title">게시판</div>
        <div className="order" onClick={onClickOrder}>

        <CurrentFilter>{filter}</CurrentFilter>
        <CaretIcon $showOrders={showOrders}/>

        {showOrders && (
          <OrderList className="orders">
            {orders.map((order) => (
              <div key={order} className="order-item"
              onClick={() => setFilter(order)}>
                {order}
            </div>
            ))}
        </OrderList>
        )}
        </div>
      </div>
      <WriteButton onClick={onClickWriteButton}>글쓰기</WriteButton>
    </HeaderSectionWrapper>
  );
}

const CurrentFilter = styled.span``;

const HeaderSectionWrapper = styled.section`
  width: 100%;
  max-width: 74.4rem;
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    .title {
      color: var(--text-primary, #171719);

      font-size: 2rem;
      font-style: normal;
      font-weight: 700;
      line-height: 140%;
      letter-spacing: -0.024rem;
    }

    .order {
      position: relative;
      border-radius: 0.8rem;
      border: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
      display: flex;
      gap: 0.4rem;
      padding: 0.6rem;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      //text
      color: var(--icon-primary, #171719);
      font-size: 1.3rem;
      font-style: normal;
      font-weight: 500;
      line-height: 138.5%; /* 18.005px */
      letter-spacing: 0.252px;
    }
  }
`;

const OrderList = styled.div`
  width: 100%;
  position: absolute;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  left: 0;
  top: 100%;
  border-radius: 0.8rem;
  border: 1px solid var(--line-secondary, rgba(112, 115, 124, 0.16));
  background-color: white;
`;


const CaretIcon = styled(IoChevronDown)`
  font-size: 1.6rem;
  transition: transform 0.2s ease;
  transform: rotate(${({ $showOrders }) => ($showOrders ? "180deg" : "0deg")});
`;

const WriteButton = styled.button`
  color: var(--text-brand-invert, #fff);

  /* label/medium-bold */

  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 142.9%; /* 2.0006rem */
  letter-spacing: 0.0203rem;

  display: flex;
  padding: 0.7rem 1.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  cursor: pointer;
  border-radius: 0.8rem;
  background: var(--button-primary, #06f);
`;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import clap from "../Images/MySectionIcon_clap.png";
import Banner from "./Banner";
import Calender from "./Calender";
import jwt_decode from "jwt-decode";
import MyPart from "./modals/MyPart"; //로그인 안했을 때 가리는 모달
import MyRecord from "./MyRecord";
import MostExercised from "./MostExercised";
import Ranking from "./Ranking";
import { actionCreators as commonActions } from "../redux/modules/common";

const MySection = () => {
  const dispatch = useDispatch();
  const myRecords = useSelector((state) => state.common.myRecords);

  const is_local = localStorage.getItem("isLogin");
  const nickName = is_local
    ? jwt_decode(localStorage.getItem("isLogin")).nickName
    : false;

  React.useEffect(() => {
    if (nickName) {
      dispatch(commonActions.getRecordsDB());
    }
  }, []);

  return (
    <MySectionContainer>
      <MySectionTitle>
        <img src={clap} alt="박수 아이콘" style={{ marginRight: "4px" }} />
        {nickName
          ? `안녕하세요211 ${nickName}님 오늘도 함께 운동해요!`
          : "홈트게더11와 함께 운동해보세요!"}
      </MySectionTitle>
      <MySectionContent>
        <MyPart />
        <MyPage>
          <Ranking />
          <MyRecord myRecords={myRecords}></MyRecord>
          <Calender></Calender>
        </MyPage>
        <RightSection>
          <MostExercised myRecords={myRecords} />
          <Banner></Banner>
        </RightSection>
      </MySectionContent>
    </MySectionContainer>
  );
};

const MySectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1320px;
  align-items: center;
  margin: 56px 0 64px 0;
  @media screen and (max-width: 1360px) {
    width: 1000px;
  }
  position: relative;
`;

const MySectionTitle = styled.div`
  color: #222529;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: center;
  margin-bottom: 30px;
`;

const MySectionContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
const MyPage = styled.div`
  width: 965px;
  height: 284px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: space-between;
  @media screen and (max-width: 1360px) {
    display: none;
  }
`;

export default MySection;

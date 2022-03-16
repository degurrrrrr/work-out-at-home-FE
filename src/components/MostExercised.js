import React from 'react';
import styled from 'styled-components';

import MyCategoryRecordIcon from '../Images/MyCategoryRecordIcon.png';
import Category1 from '../Images/Category1.png';
import Category2 from '../Images/Category2.png';

const MostExercised = (props) => {
  const { myRecords } = props;

  console.log(myRecords);
  const records = myRecords.mostExercised;
  console.log(records); //length 있음

  // React.useEffect(() => {}, []);

  return (
    <>
      <MostExercisedContainer>
        <MostExercisedHeader>
          이런 운동을 많이 했어요
          <img src={MyCategoryRecordIcon} alt="팔 아이콘" style={{ marginLeft: '2px' }} />
        </MostExercisedHeader>
        <MostExercisedContentBox>
          {records ? (
            <>
              {records[0] && (
                <MostExercisedContent>
                  <img src={Category1} alt="" className="MostExercisedImg" />
                  <div className="MostExercisedContentTextBox">
                    <div className="MostExercisedTitle">{records[0][0]}</div>
                    <div className="MostExercisedTimes">{records[0][1]}회</div>
                  </div>
                </MostExercisedContent>
              )}
              {records[1] && (
                <MostExercisedContent>
                  <img src={Category2} alt="" className="MostExercisedImg" />
                  <div className="MostExercisedContentTextBox">
                    <div className="MostExercisedTitle">{records[1][0]}</div>
                    <div className="MostExercisedTimes">{records[1][1]}회</div>
                  </div>
                </MostExercisedContent>
              )}
            </>
          ) : (
            <>
              <Noti>
                <div>
                  아직 운동 기록이 없어요. <br />
                  홈트게더와 함께 즐거운 운동을 경험해보세요!
                </div>
              </Noti>
            </>
          )}
        </MostExercisedContentBox>
      </MostExercisedContainer>
    </>
  );
};
const MostExercisedContainer = styled.div`
  width: 315px;
  height: 136px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  padding: 24px 24px 20px 24px;
`;
const MostExercisedHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  letter-spacing: -0.48px;
`;

const MostExercisedContentBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MostExercisedContent = styled.div`
  width: 130px;
  height: 56px;
  border-radius: 6px;
  background-color: #f1f3f5;
  display: flex;
  align-items: center;
  padding: 8px 6px;
  letter-spacing: -0.96px;

  .MostExercisedContentTextBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5px;
  }
  .MostExercisedTitle {
    font-size: 14px;
  }
  .MostExercisedTimes {
    font-size: 12px;
    color: #878e95;
  }
  .MostExercisedImg {
    width: 40px;
    height: 40px;
  }
`;

const Noti = styled.div`
  width: 255px;
  height: 40px;
  letter-spacing: -0.96px;
  color: #aeb5bc;
  margin-top: 3px;
`;

export default MostExercised;
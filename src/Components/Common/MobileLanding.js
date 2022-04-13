import React from 'react';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import mobile1 from './Images/MobileLanding_1.svg';
import mobile2 from './Images/MobileLanding_2.svg';
import mobile3 from './Images/MobileLanding_3.svg';
import mobile4 from './Images/MobileLanding_4.svg';

const MobileLanding = () => {
  const { Kakao } = window;

  const shareLink = () => {
    Kakao.Link.sendCustom({
      templateId: 73709,
    });
  };

  const [bannerIndex, setBannerIndex] = React.useState(0);
  const circleArray = [0, 0, 0, 0];

  const clickPrev = () => {
    if (bannerIndex <= 0) {
      setBannerIndex(circleArray.length - 1);
      return;
    }
    setBannerIndex(bannerIndex - 1);
  };
  const clickNext = () => {
    if (bannerIndex >= circleArray.length - 1) {
      setBannerIndex(0);
      return;
    }
    setBannerIndex(bannerIndex + 1);
  };

  const clickCircle = (i) => {
    setBannerIndex(i);
  };

  React.useEffect(() => {
    const slider = setInterval(() => setBannerIndex((value) => (value === circleArray.length - 1 ? 0 : value + 1)), 5500);
    return () => clearInterval(slider);
  }, []);

  return (
    <DIV>
      <Contents>
        <Container>
          <Carousel bannerIndex={bannerIndex}>
            {circleArray.map((e, i) => (
              <ContentBox style={{ display: 'flex' }} index={i} key={i}>
                <div className="banner">
                  {bannerIndex === 0 ? (
                    <img src={mobile1} alt="모바일 배너 1" />
                  ) : bannerIndex === 1 ? (
                    <img src={mobile2} alt="모바일 배너 2" />
                  ) : bannerIndex === 2 ? (
                    <img src={mobile3} alt="모바일 배너 3" />
                  ) : (
                    <img src={mobile4} alt="모바일 배너4" />
                  )}
                </div>
              </ContentBox>
            ))}
          </Carousel>
          <CircleBox>
            {circleArray.map((e, i) => (
              <Circle
                key={i}
                onClick={() => {
                  clickCircle(i);
                }}
                style={{
                  backgroundColor: i === bannerIndex ? '#AEB5BC' : '',
                  transition: 'width 0.9s',
                }}
              />
            ))}
          </CircleBox>
        </Container>
        <LinkBtn
          onClick={() => {
            shareLink();
          }}
        >
          홈트게더 링크 공유하기
        </LinkBtn>
        <TextWrap>
          홈트게더는 태블릿과 PC에서 이용할 수 있어요 <br />
          링크를 공유하고 태블릿 또는 PC에서 접속해 주세요!
        </TextWrap>
      </Contents>
    </DIV>
  );
};

const DIV = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding-top: 40px; //84px;
`;

// 캐러셀
const Container = styled.div`
  width: 292px;
  height: 344px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow-x: hidden;
`;

const Carousel = styled.div`
  display: flex;
  transition: 0.2s;
  transform: translate(
    ${(props) => {
      return -(props.bannerIndex * 292) + 'px';
    }}
  );
`;
const ContentBox = styled.div`
  transform: ease-in-out 0.5s;
  .banner {
    width: 292px;
    height: 344px;
    overflow: hidden;
    position: relative;
  }
  .banner > img {
    position: absolute;
    width: 100%;
  }
`;
const CircleBox = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Circle = styled.div`
  width: 4px;
  height: 4px;
  background: #dfe2e6;
  border-radius: 100%;
  margin: 0px 4px;
  cursor: pointer;
`;

const LinkBtn = styled.div`
  width: 220px; //232px;
  height: 56px;
  border-radius: 8px;
  background-color: #0028fa;
  font-size: 16px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 28px 0 24px;
`;

const TextWrap = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.48px;
`;

export default MobileLanding;

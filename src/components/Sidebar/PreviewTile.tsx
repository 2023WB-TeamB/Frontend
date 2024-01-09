import React, { useState } from "react";
import styled from "styled-components";
import Preview from "./Preview";
import LeftArrowIcon from "../../assets/images/arrow_left.png";
import RightArrowIcon from "../../assets/images/arrow_right.png";

const PreviewWrapper = styled.div`
  width: 382px;
  margin: 3px 0 3px 0;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: start;

  h3 {
    margin: 0;
    margin-left: 8%;
  }

  hr {
    margin-left: 9%;
    margin-right: 9%;
    width: 82%;
    height: 1px;
    background-image: linear-gradient(to right, #76CAE8, #AD51DE);
    border: none;
  }
`;

const SlideWrapper = styled.span`
  max-width: 382px;
  height: 145px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

const Button = styled.button<{ imageUrl: string }>`
  padding: 0;
  width: 24px;
  height: 24px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: transparent;
  color: #000;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageWrapper = styled.div`
  position: relative;
  width: 80%;
  overflow: hidden;
`;

const Slider = styled.span`
  position: relative;
  width: 100%;
  transition: transform .5s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface PreviewTileProps {
  title: string;
  pages: string[];
}

// 프로젝트 미리보기 타일
const PreviewTile: React.FC<PreviewTileProps> = ({ title, pages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const style = {
    transform: `translateX(${((pages.length / 2) - currentPage) * 100 - 150}px)`,
  }

  // 이전
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage === 0 ? pages.length - 1 : prevPage - 1);
  };

  // 다음
  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  return (
    <PreviewWrapper>
      <h3>{title}</h3>
      <hr></hr>
      <SlideWrapper>
        <Button
          onClick={goToPreviousPage} 
          imageUrl={LeftArrowIcon}>
        </Button>
        <PageWrapper>
          <Slider style={style}>
            {pages.map((page, index) => (
              <Preview
                key={index}
                content={page}
              />
            ))}
          </Slider>
        </PageWrapper>
        <Button 
          onClick={goToNextPage}
          imageUrl={RightArrowIcon}>
        </Button>
      </SlideWrapper>
    </PreviewWrapper>
  );
};

export default PreviewTile;

import React, { useState } from "react";
import styled from "styled-components";
import Preview from "./Preview";

const PreviewWrapper = styled.div`
  width: 100%;
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

  & span {
    max-width: 382px;
    height: 145px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: ease .5s;
`;

interface PreviewTileProps {
  title: string;
  pages: string[];
}

// 프로젝트 미리보기 타일
const PreviewTile: React.FC<PreviewTileProps> = ({ title, pages }) => {

  const [currentPage, setCurrentPage] = useState(0);

  // 이전
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage === 0 ? pages.length - 1 : prevPage - 1);
  };

  // 다음
  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length);
  };

  const visiblePages: string[] = [
    pages[(currentPage + pages.length - 1) % pages.length],
    pages[currentPage],
    pages[(currentPage + 1) % pages.length],
    pages[(currentPage + 2) % pages.length],
    pages[(currentPage + 3) % pages.length]
  ];

  return (
    <PreviewWrapper>
      <h3>{title}</h3>
      <hr></hr>
      <span>
        <Button
          onClick={goToPreviousPage} 
          imageUrl="https://cdn-icons-png.flaticon.com/512/109/109618.png">
        </Button>
        <PageWrapper>
          {visiblePages.map((page, index) => (
            <Preview
              key={index}
              content={page}
            />
          ))}
        </PageWrapper>
        <Button 
          onClick={goToNextPage}
          imageUrl="https://cdn-icons-png.flaticon.com/512/109/109617.png">
        </Button>
      </span>
    </PreviewWrapper>
  );
};

export default PreviewTile;

import React from "react";
import styled from "styled-components";

interface PreviewProps {
  content: string; // 미리보기 문서 내용
  isActive?: boolean;
}

// 개별 미리보기 문서 스타일
const PreviewContent = styled.p`
  margin: 6px;
  min-width: 88px;
  height: 124.4px;
  background-color: white;
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  font-size: 8.8px;
  line-height: 1.5;
  transition: ease .5s;

  // 호버시 확장
  &:hover {
    margin: 0;
    min-width: 100px;
    height: 141.4px;
    font-size: 10px;
    transition: ease .5s;
  }
`;

const Preview: React.FC<PreviewProps> = ({ content }) => {
  return (
    <PreviewContent>{content}</PreviewContent>
  );
};

export default Preview;

import React, { useState } from 'react'
import styled from 'styled-components'
import VersionPreview from './VersionPreview'
import LeftArrowIcon from '../../../assets/images/Viewer/arrow_left.png'
import LeftArrowIcon_Dark from '../../../assets/images/Viewer/arrow_left_dark.svg'
import RightArrowIcon from '../../../assets/images/Viewer/arrow_right.png'
import RightArrowIcon_Dark from '../../../assets/images/Viewer/arrow_right_dark.svg'
import { useDarkModeStore } from '../../../store/store'
import { projectData } from './SidebarPanel'

const PreviewWrapper = styled.div`
  width: 382px;
  margin: 3px 0 30px 0;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    width: 80%;
    text-align: left;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  hr {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 9%;
    margin-right: 9%;
    width: 82%;
    height: 0.5px;
    background-image: linear-gradient(to right, #76cae8, #ad51de);
    border: none;
  }
`

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
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-color: transparent;
  color: #000;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PageWrapper = styled.div`
  position: relative;
  width: 300px;
  overflow-x: hidden;
`

const Slider = styled.span`
  position: relative;
  width: 100%;
  transition: transform 0.5s;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

interface PreviewTileProps {
  title: string
  pages: Array<projectData>
}

// 프로젝트 미리보기 타일
const VersionPreviewTile: React.FC<PreviewTileProps> = ({ title, pages }) => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const [currentPage, setCurrentPage] = useState(0)
  const style = {
    transform: `translateX(${(pages.length / 2 - currentPage) * 100 - 150}px)`,
  }

  // 이전
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? pages.length - 1 : prevPage - 1))
  }

  // 다음
  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % pages.length)
  }

  return (
    <PreviewWrapper>
      <h3>{title}</h3>
      <hr />
      <SlideWrapper>
        <Button
          onClick={goToPreviousPage}
          imageUrl={isDarkMode ? LeftArrowIcon_Dark : LeftArrowIcon}></Button>
        <PageWrapper>
          <Slider style={style}>
            {pages.map((page, index) => (
              <VersionPreview key={index} content={page} />
            ))}
          </Slider>
        </PageWrapper>
        <Button
          onClick={goToNextPage}
          imageUrl={isDarkMode ? RightArrowIcon_Dark : RightArrowIcon}></Button>
      </SlideWrapper>
    </PreviewWrapper>
  )
}

export default VersionPreviewTile

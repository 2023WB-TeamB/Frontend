import React from 'react'
import styled from 'styled-components'
import Preview from './Preview'

const PreviewWrapper = styled.div`
  width: 80%;
  margin: 3px 0 3px 0;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    width: 85%;
    text-align: left;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  hr {
    margin-left: 9%;
    margin-right: 9%;
    width: 82%;
    height: 1px;
    background-image: linear-gradient(to right, #76cae8, #ad51de);
    border: none;
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
  pages: Array<{
    id: number,
    title: string,
    color: string,
    created_at: string
  }>
}

// 프로젝트 미리보기 타일
const GalleryPreviewTile: React.FC<PreviewTileProps> = ({ title, pages }) => {
  return (
    <PreviewWrapper>
      <h3>{title}</h3>
      <hr></hr>
        <PageWrapper>
            <Slider>
            {pages.map((page, index) => (
                <Preview key={index} content={page} />
            ))}
            </Slider>
        </PageWrapper>
    </PreviewWrapper>
  )
}

export default GalleryPreviewTile

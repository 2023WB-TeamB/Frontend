import React from 'react'
import styled from 'styled-components'
import GalleryPreview from './GalleryPreview'

const PreviewWrapper = styled.div`
  width: 80%;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const PageWrapper = styled.div`
  position: relative;
  width: 280px;
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
      <PageWrapper>
          {pages.length > 0 && 
            <GalleryPreview key={title} content={pages[0]} />
          }
      </PageWrapper>
    </PreviewWrapper>
  )
}

export default GalleryPreviewTile

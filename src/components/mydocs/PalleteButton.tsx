import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { CirclePicker, ColorResult } from 'react-color'
import axios from 'axios'
import { desaturate } from 'polished'
import { cardColorStore, cardIdStore, docStore, previewOpenStore, useApiUrlStore } from '../../store/store'

function PaletteIcon({ color }: { color: string }) {
  return (
    <svg width="26" height="24" viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 34.5837C15.6083 34.5837 13.3479 34.1352 11.2188 33.2383C9.08958 32.3415 7.23021 31.1172 5.64062 29.5654C4.05104 28.0137 2.79688 26.1986 1.87813 24.1201C0.959375 22.0416 0.5 19.835 0.5 17.5003C0.5 15.1371 0.973958 12.9163 1.92188 10.8378C2.86979 8.75935 4.15313 6.95137 5.77188 5.41387C7.39063 3.87637 9.27917 2.65918 11.4375 1.7623C13.5958 0.86543 15.9 0.416992 18.35 0.416992C20.6833 0.416992 22.8854 0.808485 24.9563 1.59147C27.0271 2.37446 28.8427 3.4564 30.4031 4.8373C31.9635 6.21821 33.2031 7.85536 34.1219 9.74876C35.0406 11.6422 35.5 13.685 35.5 15.8774C35.5 19.1517 34.4792 21.6644 32.4375 23.4154C30.3958 25.1665 27.9167 26.042 25 26.042H21.7625C21.5 26.042 21.3177 26.1132 21.2156 26.2555C21.1135 26.3979 21.0625 26.5545 21.0625 26.7253C21.0625 27.067 21.2812 27.5581 21.7188 28.1988C22.1562 28.8394 22.375 29.5726 22.375 30.3982C22.375 31.8219 21.974 32.8753 21.1719 33.5587C20.3698 34.242 19.3125 34.5837 18 34.5837ZM8.375 19.2087C9.13333 19.2087 9.76042 18.9666 10.2563 18.4826C10.7521 17.9986 11 17.3864 11 16.6462C11 15.9059 10.7521 15.2937 10.2563 14.8097C9.76042 14.3257 9.13333 14.0837 8.375 14.0837C7.61667 14.0837 6.98958 14.3257 6.49375 14.8097C5.99792 15.2937 5.75 15.9059 5.75 16.6462C5.75 17.3864 5.99792 17.9986 6.49375 18.4826C6.98958 18.9666 7.61667 19.2087 8.375 19.2087ZM13.625 12.3753C14.3833 12.3753 15.0104 12.1333 15.5062 11.6493C16.0021 11.1653 16.25 10.5531 16.25 9.81283C16.25 9.07255 16.0021 8.4604 15.5062 7.97637C15.0104 7.49234 14.3833 7.25033 13.625 7.25033C12.8667 7.25033 12.2396 7.49234 11.7438 7.97637C11.2479 8.4604 11 9.07255 11 9.81283C11 10.5531 11.2479 11.1653 11.7438 11.6493C12.2396 12.1333 12.8667 12.3753 13.625 12.3753ZM22.375 12.3753C23.1333 12.3753 23.7604 12.1333 24.2562 11.6493C24.7521 11.1653 25 10.5531 25 9.81283C25 9.07255 24.7521 8.4604 24.2562 7.97637C23.7604 7.49234 23.1333 7.25033 22.375 7.25033C21.6167 7.25033 20.9896 7.49234 20.4938 7.97637C19.9979 8.4604 19.75 9.07255 19.75 9.81283C19.75 10.5531 19.9979 11.1653 20.4938 11.6493C20.9896 12.1333 21.6167 12.3753 22.375 12.3753ZM27.625 19.2087C28.3833 19.2087 29.0104 18.9666 29.5063 18.4826C30.0021 17.9986 30.25 17.3864 30.25 16.6462C30.25 15.9059 30.0021 15.2937 29.5063 14.8097C29.0104 14.3257 28.3833 14.0837 27.625 14.0837C26.8667 14.0837 26.2396 14.3257 25.7438 14.8097C25.2479 15.2937 25 15.9059 25 16.6462C25 17.3864 25.2479 17.9986 25.7438 18.4826C26.2396 18.9666 26.8667 19.2087 27.625 19.2087ZM18 31.167C18.2625 31.167 18.474 31.0958 18.6344 30.9535C18.7948 30.8111 18.875 30.626 18.875 30.3982C18.875 29.9996 18.6562 29.5298 18.2188 28.9889C17.7812 28.4479 17.5625 27.6364 17.5625 26.5545C17.5625 25.3587 17.9854 24.4048 18.8313 23.693C19.6771 22.9812 20.7125 22.6253 21.9375 22.6253H25C26.925 22.6253 28.5729 22.0772 29.9438 20.9811C31.3146 19.8849 32 18.1837 32 15.8774C32 12.4323 30.651 9.56369 27.9531 7.27168C25.2552 4.97967 22.0542 3.83366 18.35 3.83366C14.3833 3.83366 11 5.15762 8.2 7.80553C5.4 10.4535 4 13.685 4 17.5003C4 21.2871 5.36354 24.5116 8.09063 27.1738C10.8177 29.8359 14.1208 31.167 18 31.167Z"
        fill={color}
      />
    </svg>
  )
}

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.4rem 0.5rem;
  outline: none;
  transition: background-color 0.2s ease; // 배경색의 전환 시간 설정
  &:hover {
    background-color: rgba(0, 0, 0, 0.05); // 호버 시 배경색 조금 더 밝게
  }
  &:active {
    outline: none; // 클릭 시 테두리가 나타나지 않도록 설정
    background-color: rgba(0, 0, 0, 0.1); // 클릭 시 배경색 더 밝게
  }
  &:focus {
    outline: none; // 포커스 시 테두리가 나타나지 않도록 설정
  }
`

const colors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#c4d432',
  '#f6d738',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
]

const loweredSaturationColors = colors.map((color) => desaturate(0.15, color))

// 색상 선택 도구를 감싸는 컴포넌트
const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 3.5rem;
  right: -4.3rem;
  z-index: 2;
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.05rem solid gray;
`

// 색상 선택 도구 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`

function PalleteButton() {
  const { docsApiUrl } = useApiUrlStore()
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const { previewOpen } = previewOpenStore()
  const { cardColor, setCardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
    setCardColor: state.setCardColor,
  }))
  const { docs, setDocs } = docStore()
  const { cardId } = cardIdStore()

  // 모달 창 닫힐 때 색상 선택 도구 자동으로 닫히게 함
  useEffect(() => {
    if (!previewOpen) {
      setDisplayColorPicker(false)
    }
  }, [previewOpen])

  // 팔레트 버튼 누르면 색상 선택 도구 열림/닫힘
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  // 색상 선택 도구 외부 클릭하면 닫힘
  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const ChangeColor = async (color: string) => {
    // 클라이언트 문서 색상 변경
    const newDocs = docs.map((doc) => (doc.id === cardId ? { ...doc, color } : doc))
    setDocs(newDocs)

    try {
      // DB에 있는 문서 색상 변경
      const access = localStorage.getItem('accessToken')
      const response = await axios.put(
        `${docsApiUrl}/${cardId}`,
        { color: `${color}` },
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )
      // 문서 수정 성공
      if (response.status === 200) {
        // console.log('API Response: ', response)
      }
    } catch (error: any) {
      // 문서 수정 실패
      if (error.response) {
        console.error('API Response: ', error.response)
        // alert(error.response.message)
      }
    }
  }

  // 선택한 색상 cardColor 상태에 저장 => 모달 색상 변경(Here) / 모달 닫을 때 카드 색상 변경(MyDocsPage)
  const handleChange = (color: ColorResult) => {
    setCardColor(color.hex)
    ChangeColor(color.hex)
  }

  return (
    <ButtonWrapper onClick={handleClick}>
      <PaletteIcon color={cardColor} />
      {displayColorPicker ? (
        <>
          <Overlay onClick={handleClose} />
          <ColorPickerWrapper>
            <CirclePicker
              colors={loweredSaturationColors}
              color={cardColor}
              onChange={handleChange}
            />
          </ColorPickerWrapper>
        </>
      ) : null}
    </ButtonWrapper>
  )
}

export default PalleteButton

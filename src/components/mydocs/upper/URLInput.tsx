import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Doc, docStore, isEnglishStore, isGeneratingStore } from '../../../store/store'
import { useDarkModeStore } from '../../../store/store'
import Swal from 'sweetalert2'
import colors from './defaultColors.json'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  max-height: 70px;
  min-height: 60px;
  width: 50vw;
  max-width: 800px;
  min-width: 660px;
  margin-top: 2vh;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: -0.063rem;
    left: -0.063rem;
    bottom: -0.063rem;
    right: -0.063rem;
    background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
    border-radius: 4.09rem;
    z-index: -1;
  }
`

const StyledInput = styled.input<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#ffffff')};
  border: 1px solid rgb(165, 101, 224);
  border-radius: 65.5px;
  box-shadow: 0.15rem 0.3rem 0.35rem #0000001a;
  height: 100%;
  width: 100%;
  padding: 0 20px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  text-align: center;
`
export const URLInput: React.FC = () => {
  const [url, setUrl] = useState('')
  const { isEnglish } = isEnglishStore()
  const apiUrl = 'https://gtd.kro.kr/api/v1/docs/create'
  const language = isEnglish ? 'ENG' : 'KOR'
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { setIsGenerating } = isGeneratingStore()

  // 입력값은 이 함수를 벗어나면 알 수 없으므로 state로 관리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const { addDoc } = docStore()

  // 문서 생성시 기본 색상 중 하나를 랜덤으로 지정
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex].color
  }

  // 문서 생성 함수
  const handleGenDoc = async () => {
    try {
      // API 호출, 엑세스 토큰
      setIsGenerating(true)
      const access = localStorage.getItem('accessToken')
      const color = getRandomColor()
      const response = await axios.post(
        `${apiUrl}`,
        { repository_url: url, language: language, color: color },
        {
          headers: { Authorization: `Bearer ${access}` },
        },
      )
      console.log(response)
      setUrl('')

      // 문서 생성 성공
      if (response.status === 201) {
        setIsGenerating(false)
        console.log('API Response: ', response)

        // response.data.data에서 Doc 인터페이스에 맞는 데이터만 추출
        const newDoc: Doc = {
          id: response.data.data.docs_id,
          title: response.data.data.title,
          created_at: response.data.data.created_at,
          color: response.data.data.color,
        }

        addDoc(newDoc)

        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Successfully created document!',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        })
      }
    } catch (error: any) {
      // 문서 생성 실패
      if (error.response) {
        setIsGenerating(false)
        console.error('API Response: ', error.response.status)
        Swal.fire({
          position: 'bottom-end',
          icon: 'error',
          title: 'Document creation failed!',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        })
      }
    }
  }

  // input에 내용이 존재하고 엔터키를 눌렀을 때 제출
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (url != '' && e.key === 'Enter') {
      e.preventDefault()
      handleGenDoc()
    }
  }

  return (
    <Wrapper>
      <StyledInput
        isDarkMode={isDarkMode}
        type="text"
        value={url}
        placeholder="Please enter your GitHub repository URL here..."
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
    </Wrapper>
  )
}

export default URLInput

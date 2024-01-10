import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { isEnglishStore } from '../../../store/store'

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
`

const StyledInput = styled.input`
  background-color: #ffffff;
  border: 1px solid rgb(165, 101, 224);
  border-radius: 65.5px;
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
  const apiUrl = 'http://gtd.kro.kr:8000/api/v1/docs/create/'
  const language = isEnglish ? 'ENG' : 'KOR'

  // 입력값은 이 함수를 벗어나면 알 수 없으므로 state로 관리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  const handleGenDoc = async () => {
    try {
      // API 호출
      const response = await axios.post(`${apiUrl}`, { repository_url: url, language: language })
      console.log(response)
      setUrl('')

      //문서 생성 성공
      if (response.status === 201) {
        console.log('API Response: ', response.status)
        isEnglish ? alert('영어 문서 생성!') : alert('한글 문서 생성!')
      }
    } catch (error: any) {
      if (error.response) {
        console.error('API Response: ', error.response.status)
        alert(error.response.message)
        setUrl('')
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (url != '' && e.key === 'Enter') {
      e.preventDefault()
      handleGenDoc()
    }
  }

  return (
    <Wrapper>
      <StyledInput
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

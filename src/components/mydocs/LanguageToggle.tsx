import { useState } from 'react'
import styled from 'styled-components'

const LanguageToggleWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80px;
  height: 12px;
  border: 0.5px solid #76cae8;
  border-radius: 30px;
  padding: 8px;
  cursor: pointer;
  position: relative;
`

const ToggleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 22px;
  background-color: #9c79e2;
  border-radius: 30px;
  opacity: 0.9;
  transition: 0.2s;
  position: absolute;
  left: 3px;
  z-index: 1;
`

interface ToggleTextProps {
  selected: boolean
}

const ToggleText = styled.p<ToggleTextProps>`
  color: ${(props) => (props.selected ? '#FFFFFF' : '#00000048')};
  z-index: 2;
  margin: 7px;
`

const LanguageToggle = () => {
  const [isEnglish, setIsEnglish] = useState(false)

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }

  return (
    <LanguageToggleWrapper onClick={toggleLanguage}>
      <ToggleText selected={!isEnglish}>KOR</ToggleText>
      <ToggleBox style={{ transform: isEnglish ? 'translateX(46px)' : 'translateX(0)' }} />
      <ToggleText selected={isEnglish}>ENG</ToggleText>
    </LanguageToggleWrapper>
  )
}

export default LanguageToggle

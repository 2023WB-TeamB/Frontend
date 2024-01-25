import styled from 'styled-components'
import { isEnglishStore } from '../../../store/store'

// 토글 스타일
const Toggle = styled.div`
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

// 스위치 스타일
const Switch = styled.div`
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

// 스위치가 옮겨진 쪽의 글씨는 흰색, 그렇지 않은 쪽은 회색.
/* 다크모드에서도 글씨 잘 보일 수 있도록 색깔 조정했습니다! 색은 이전과 같은데 투명도만 없앴습니다. -채영-*/
const Text = styled.p<ToggleTextProps>`
  color: ${(props) => (props.selected ? '#FFFFFF' : '#d2d2d2')};
  z-index: 2;
  margin: 7px;
`

// isEnglish에 영어/한글 상태 저장
// store.ts에 저장해놓은 상태관리 함수 호출
function LanguageToggle() {
  const { isEnglish, setIsEnglish } = isEnglishStore()

  const onClick = () => {
    setIsEnglish(!isEnglish)
  }

  // translateX를 사용하여 스위치 이동
  return (
    <Toggle onClick={onClick}>
      <Text selected={!isEnglish}>KOR</Text>
      <Switch style={{ transform: isEnglish ? 'translateX(46px)' : 'translateX(0)' }} />
      <Text selected={isEnglish}>ENG</Text>
    </Toggle>
  )
}

export default LanguageToggle

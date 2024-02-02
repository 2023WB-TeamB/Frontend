import React from 'react'
import styled from 'styled-components'
import Signin from '../Signin.tsx'
import { useModalStore } from '../ModalStore.tsx'
import { useDarkModeStore } from '../../store/store.ts'
import DoubleDownArrow from './doubleDownArrow.tsx'

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  scroll-snap-align: center;
`
/* -----Wrapper----- */
const LogoWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`

// Logo
const Main = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  font-family: 'DMSerifDisplay', serif;
  color: transparent;
  margin: 0;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);

  background-clip: text;
  -webkit-background-clip: text;

  @media (max-width: 720px) {
    font-size: 7rem;
  }
`
const Smalli = styled.span`
  font-size: 7rem;

  @media (max-width: 720px) {
    font-size: 6rem;
  }
`

// Join us 부분
export const Sub = styled.h1<{ $isDarkMode: boolean }>`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  white-space: nowrap;

  @media (max-width: 720px) {
    font-size: 1rem;
  }
`
// InputBox
const InputBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40.39rem;
  height: 3.75rem;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  border-radius: 4.09rem;

  @media (max-width: 720px) {
    width: 35.39rem;
  }
`
const InputBox = styled.input<{ $isDarkMode: boolean }>`
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : 'white')};
  border: none;
  border-radius: 4.09rem;
  box-shadow: 0.125rem 0.25rem 0.3125rem #0000001a;
  height: 3.5rem;
  width: 40rem;
  text-align: center;
  font-size: 16px;
  color: ${(props) => (props.$isDarkMode ? 'white' : '#1a1a1a')};
  transition: ease 0.5s;

  @media (max-width: 720px) {
    width: 35rem;
  }
`
/* ** Publishing ** */
const Page1: React.FC = () => {
  const { isSigninOpen, toggleSignin } = useModalStore() // 로그인 모달 상태
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  // 로그인 모달 핸들러
  const handleSigninOpen = () => {
    toggleSignin() // 로그인 open/close 토글
  }
  /* *InputBox -> Enter -> Register모달* */
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSigninOpen()
    }
  }
  return (
    <>
      <Section>
        <LogoWrapper>
          <Main>
            G<Smalli>i</Smalli>ToDoc
          </Main>
          <Sub $isDarkMode={$isDarkMode}>Join us to change github repository to file!</Sub>
          <InputBoxWrapper>
            <InputBox
              $isDarkMode={$isDarkMode}
              type="text"
              onKeyDown={handleEnter}
            />
          </InputBoxWrapper>
        </LogoWrapper>
        <DoubleDownArrow />
      </Section>
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Page1

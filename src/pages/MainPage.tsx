import styled from 'styled-components'
import Header from '../components/Header'
import { Page3 } from '../components/MainPage/page3'
import { Page4 } from '../components/MainPage/page4'
import { Page5 } from '../components/MainPage/page5'
import { Page2 } from '../components/MainPage/page2'

const Container = styled.div`
  scroll-snap-type: y mandatory;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`

const Section = styled.section`
  scroll-snap-align: start;
  position: relative;
  width: 100vw;
  height: 100vh;
`

const Main = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  font-family: 'DMSerif', serif;
  color: transparent;
  background: linear-gradient(270deg, rgb(173, 81, 222) 0%, rgb(118, 202, 232) 100%);
  -webkit-background-clip: text;
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
`
const Smalli = styled.span`
  font-size: 7rem;
`

export const Sub = styled.h1`
  font-size: 1.2rem;
  font-weight: 300;
  font-family: Inter, sans-serif;
  color: black;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`
const InputBoxWrapper = styled.div`
  position: absolute;
  width: 40.39rem;
  top: 53%;
  left: 50%;
  transform: translateX(-50%);
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
const InputBox = styled.input`
  background-color: #ffffff;
  border: solid 0.063rem transparent;
  border-radius: 4.09rem;
  box-shadow: 0.125rem 0.25rem 0.3125rem #0000001a;
  height: 3.5rem;
  width: 40rem;
  text-align: center;
  font-size: 1.3rem;
  color: #1a1a1a;
`

const MainPage: React.FC = () => {
  const isLogin: boolean = false // 기본값은 로그아웃 상태
  return (
    <div>
      <Header isLogin={isLogin} />
      <Container>
        <Section>
          <Main>
            G<Smalli>i</Smalli>ToDoc
          </Main>
          <Sub>Join us to change github repository to file!</Sub>
          <InputBoxWrapper>
            <InputBox type="text" />
          </InputBoxWrapper>
        </Section>
        <Section>
          <Page2 />
        </Section>
        <Section>
          <Page3 />
        </Section>
        <Section>
          <Page4 />
        </Section>
        <Section>
          <Page5 />
        </Section>
      </Container>
    </div>
  )
}

export default MainPage

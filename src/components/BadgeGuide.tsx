import { useRef } from 'react'
import styled from 'styled-components'
/*------------------------------------------------*/
import { useGuideStore, useDarkModeStore } from '../store/store'
import { useOutsideClick } from './useOutsideClick'
/*------------------------------------------------*/
import help from '../assets/images/Viewer/Badge/help.svg'
import help_dark from '../assets/images/Viewer/Badge/help_dark.svg'
import helpPage from '../assets/images/Viewer/Badge/helpPage.svg'
import helpPage_dark from '../assets/images/Viewer/Badge/helpPage_dark.svg'
import themes from '../assets/images/Viewer/Badge/themes.svg'

export const Icon = styled.img<{ $isDarkMode: boolean }>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  margin-right: 25px;
  margin-bottom: 25px;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
`
const StyledHelpPage = styled.img<{ $isDarkMode: boolean }>`
  position: fixed;
  width: 513px;
  height: 610px;
  bottom: 50px;
  right: 15px;

  z-index: 0;
`
const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 35px;
  width: 425px;
  height: 515px;
  bottom: 75px;
  right: 25px;

  z-index: 1;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;

  z-index: 2;
`
const Instruction = styled.div`
  display: flex;
  gap: 4px;

  margin-bottom: 2px;
`
interface FontProps {
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
}
const StyledFont = styled.p<
  FontProps & { fontDark: string; fontLight: string; $isDarkMode: boolean }
>`
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || '400'};
  font-family: ${(props) => props.fontFamily || 'Inter'};
  color: ${(props) => (props.$isDarkMode ? props.fontDark : props.fontLight || 'black')};

  height: auto;
  width: auto;
  z-index: 3;
  margin: 0;
`
interface BoxProps {
  color?: string
}
const Box = styled.div<BoxProps & { $isDarkMode: boolean; boxDark: string; boxLight: string }>`
  width: 395px;
  padding: 10px 15px;

  border-radius: 15px;
  background-color: ${(props) => (props.$isDarkMode ? props.boxDark : props.boxLight || '#FDF9E9')};
  font-size: 11px;
  font-family: monospace;
  line-height: 1.5;
`

/* -----------Publishing-------------*/
export const BadgeGuide = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { isGuideOpen, openGuide, closeGuide } = useGuideStore()
  const iconRef = useRef(null)

  const toggleGuide = () => {
    isGuideOpen ? closeGuide() : openGuide()
  }

  // 모달 외부 클릭을 감지하는 함수
  // 모달 외부나 아이콘을 다시 클릭하면 모달 닫힘
  const modalRef = useOutsideClick(closeGuide, iconRef)

  return (
    <>
      <Icon
        ref={iconRef}
        $isDarkMode={$isDarkMode}
        src={$isDarkMode ? help_dark : help}
        onClick={toggleGuide}
        alt="badge_guide"
      />
      {isGuideOpen && (
        <div ref={modalRef} style={{ top: 0, bottom: 0, left: 0, right: 0 }}>
          <StyledHelpPage $isDarkMode={$isDarkMode} src={$isDarkMode ? helpPage_dark : helpPage} />
          <Container>
            <StyledFont
              $isDarkMode={$isDarkMode}
              fontSize="21px"
              fontWeight="600"
              fontDark="white"
              fontLight="#202020">
              How to make badges?
            </StyledFont>
            <div style={{ margin: 4 }} />
            <Content>
              <Instruction>
                <StyledFont $isDarkMode={$isDarkMode} fontLight="#1C6EF3" fontDark="#5F7EAF">
                  &gt;
                </StyledFont>
                <StyledFont $isDarkMode={$isDarkMode} fontLight="#202020" fontDark="white">
                  Please fill in your information in the appropriate place.
                </StyledFont>
              </Instruction>
              <Box $isDarkMode={$isDarkMode} boxLight="#fdf6db" boxDark="#413C26">
                {'<img src="https://gtd.kro.kr/api/badge/'}
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{owner}'}</span>
                {'/'}{' '}
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{repository}'}</span>
                /
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>
                  {'{contributor}'}
                </span>
                ?theme=
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{theme_name}'}</span>
                &start=
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{yyyymmdd}'}</span>
                &end=
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{yyyymmdd}'}</span>
                &stack1=
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{name}'}</span>
                &stack2=
                <span style={{ color: $isDarkMode ? '#E69B9B' : '#CE0A0A' }}>{'{name}'}</span>
                {'" />'}
              </Box>
            </Content>
            <div style={{ margin: 8 }} />
            <Content>
              <Instruction>
                <StyledFont $isDarkMode={$isDarkMode} fontLight="#1C6EF3" fontDark="#5F7EAF">
                  &gt;
                </StyledFont>
                <StyledFont $isDarkMode={$isDarkMode} fontLight="#202020" fontDark="white">
                  You have to use the stack name as we have set it.
                </StyledFont>
              </Instruction>
              <Box $isDarkMode={$isDarkMode} boxLight="#FCF3F3" boxDark="#4E3534">
                <span style={{ color: $isDarkMode ? '#FFEEEE' : '#410E0B' }}>
                  django, react, flutter, angular, nuxt, svelte, nodejs, springboot, spring, unity,
                  vue, fastapi, flask, next
                </span>
              </Box>
            </Content>
            <div style={{ margin: 8 }} />
            <Content>
              <Instruction>
                <StyledFont $isDarkMode={$isDarkMode} fontLight="#1C6EF3" fontDark="#5F7EAF">
                  &gt;
                </StyledFont>
                <StyledFont $isDarkMode={$isDarkMode} fontLight="#202020" fontDark="white">
                  Themes
                </StyledFont>
              </Instruction>
              <img src={themes} alt="themes" style={{ width: 425, height: 250 }} />
            </Content>
          </Container>
        </div>
      )}
    </>
  )
}

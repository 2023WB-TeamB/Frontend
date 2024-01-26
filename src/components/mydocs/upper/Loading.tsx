import styled, { keyframes, css } from 'styled-components'
import { useEffect } from 'react'
import githublogo from '../../../assets/images/MainPage/githublogo.svg'
import githublogo_dark from '../../../assets/images/MainPage/githublogo_dark.svg'
import file from '../../../assets/images/MainPage/file.svg'
import file_dark from '../../../assets/images/MainPage/file_dark.svg'
import folder from '../../../assets/images/MainPage/folder.svg'
import folder_dark from '../../../assets/images/MainPage/folder_dark.svg'
import logobox from '../../../assets/images/MainPage/logobox.svg'
import logobox_dark from '../../../assets/images/MainPage/logobox_dark.svg'
import logoboxopen from '../../../assets/images/MainPage/logoboxopen.svg'
import logoboxopen_dark from '../../../assets/images/MainPage/logoboxopen_dark.svg'
import document from '../../../assets/images/MainPage/document.svg'
import documnet_dark from '../../../assets/images/MainPage/document_dark.svg'
import document1 from '../../../assets/images/MainPage/document2.svg'
import document1_dark from '../../../assets/images/MainPage/document1_dark.svg'
import loadingpage from '../../../assets/images/mydocs/loadingpage.svg'
import loadingpage_dark from '../../../assets/images/mydocs/loadingpage_dark.svg'
import { generateTimeStore, isGeneratingStore, useDarkModeStore } from '../../../store/store'

const AnimationWrapper = styled.div`
  position: relative;
`
const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`

// 로딩 스피너
const Loader = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  width: 1rem;
  top: 10.4rem;
  left: -2.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 0.2rem solid ${(props) => (props.isDarkMode ? '#67b0cba9' : '#76cae89d')};
  border-right-color: ${(props) => (props.isDarkMode ? '#67b1cb' : '#76CAE8')};
  animation: ${spin} 1s infinite linear;
`

// 문서 생성 시간 타이머
const Timer = styled.div<{ isDarkMode: boolean }>`
  position: absolute;
  font-size: 1.4rem;
  color: ${(props) => (props.isDarkMode ? '#ffffff' : '#000000')};
  font-weight: 260;
  top: 9.95rem;
  left: -0.7rem;
`

const movefolder1 = keyframes`
  0%{
    transform: translateX(0);
  }
  28.6%{
    transform: translateX(0);
  }
  35.7%{
    transform: translateX(12.5rem);
    opacity: 1;
  }
  35.8%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
  100%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
`
const movefolder2 = keyframes`
  0%{
    transform: translateX(0);
  }
  35.8%{
    transform: translateX(0);
  }
  42.9%{
    transform: translateX(12.5rem);
    opacity: 1;
  }
  43.0%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
  100%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
`
const movefile1 = keyframes`
  0%{
    transform: translateX(0);
  }
  43%{
    transform: translateX(0);
  }
  50.1%{
    transform: translateX(12.5rem);
    opacity: 1;
  }
  50.2%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
  100%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
`
const movefile2 = keyframes`
  0%{
    transform: translateX(0);
  }
  50.2%{
    transform: translateX(0);
  }
  57.3%{
    transform: translateX(12.5rem);
    opacity: 1;
  }
  57.4%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
  100%{
    transform: translateX(12.5rem);
    opacity: 0;
  }
`

const movedocument = keyframes`
  0%{
    transform: translateX(-13.5rem);
    opacity:0;
  }
  88%{
    transform: translateX(-13.5rem);
    opacity:0;
  }
  89%{
    transform: translateX(-13.5rem);
    opacity:1;
  }
  100%{
    transform: translateX(0);
    opacity:1;
  }
`
const openthebox = keyframes` 
  0%{
    opacity: 0;
  }
  19%{
    opacity: 0;
  }
  20%{
    opacity: 1;
  }
  57%{
    opacity: 1;
  }
  58%{
    opacity: 0;
  }
  79%{
    opacity: 0;
  }
  80%{
    opacity: 1;
  }
  99%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
  `
const vibration = keyframes`
  0%{
    transform: rotate(0deg);
  }
  57.4%{
    transform: rotate(0deg);
  }
  58.8%{
    transform: rotate(-3deg);
  }
  60.2%{
    transform: rotate(4deg);
  }
  61.6%{
    transform: rotate(-3deg);
  }
  63%{
    transform: rotate(4deg);
  }
  64.4%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(0deg);
  }
  `

// icon(svg)
interface StylediconProps {
  top?: string
  left?: string
  width?: string
  height?: string
  zindex?: string
  delay?: string
}
const Styledicon = styled.img<StylediconProps & { visible: boolean; animationType: string }>`
  width: ${(props) => props.width || '6rem'};
  height: ${(props) => props.width || '6rem'};
  position: absolute;
  z-index: ${(props) => props.zindex || '3'};
  top: ${(props) => props.top || '22.5rem'};
  left: ${(props) => props.left || '41rem'};
  animation: ${(props) =>
    props.visible
      ? props.animationType === 'movefolder1'
        ? css`
            ${movefolder1} 7s infinite;
          `
        : props.animationType === 'movefolder2'
          ? css`
              ${movefolder2} 7s infinite;
            `
          : props.animationType === 'movefile1'
            ? css`
                ${movefile1} 7s infinite;
              `
            : props.animationType === 'movefile2'
              ? css`
                  ${movefile2} 7s infinite;
                `
              : props.animationType === 'movedocument'
                ? css`
                    ${movedocument} 7s infinite;
                  `
                : props.animationType === 'openthebox'
                  ? css`
                      ${openthebox} 7s infinite;
                    `
                  : props.animationType === 'vibration'
                    ? css`
                        ${vibration} 7s infinite;
                      `
                    : 'none'
      : 'none'};
`

// 로딩 애니메이션 배경 창
const Styledpage = styled.img`
  width: 38rem;
  position: absolute;
  top: 7.2rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`

// Publishing
export const Animation: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { isGenerating } = isGeneratingStore()
  const { generateTime, setGenerateTime } = generateTimeStore((state) => ({
    generateTime: state.generateTime,
    setGenerateTime: state.setGenerateTime,
  }))

  // 문서 생성마다 경과 시간 계산하는 로직
  useEffect(() => {
    let currentTimer: NodeJS.Timeout | null = null
    if (isGenerating) {
      const currentStartTime = Date.now()
      currentTimer = setInterval(() => {
        setGenerateTime(Date.now() - currentStartTime)
      }, 1000)
    }

    return () => {
      if (currentTimer !== null) {
        clearInterval(currentTimer)
        setGenerateTime(0)
      }
    }
  }, [isGenerating])

  return (
    <AnimationWrapper>
      <Styledpage src={isDarkMode ? loadingpage_dark : loadingpage} alt="loadingpage" />
      {isGenerating && <Loader isDarkMode={isDarkMode} />}
      <Timer isDarkMode={isDarkMode}>
        {Math.floor(generateTime / 60000)}:
        {Math.floor((generateTime % 60000) / 1000)
          .toFixed(0)
          .padStart(2, '0')}
      </Timer>
      <Styledicon
        src={isDarkMode ? githublogo_dark : githublogo}
        visible={false}
        top="3.2rem"
        left="-15rem"
        animationType="none"
        alt="githublogo"
      />
      <Styledicon
        src={isDarkMode ? logobox_dark : logobox}
        visible={isGenerating}
        zindex="1"
        top="3.2rem"
        left="-2.5rem"
        animationType="vibration"
        alt="logobox"
      />
      <Styledicon
        src={isDarkMode ? logoboxopen_dark : logoboxopen}
        visible={isGenerating}
        width="8.8rem"
        height="8.8rem"
        top="1.7rem"
        left="-4.5rem"
        zindex="2"
        animationType="openthebox"
        alt="logoboxopen"
      />
      <Styledicon
        src={isDarkMode ? documnet_dark : document}
        visible={isGenerating}
        top="3.7rem"
        left="10rem"
        width="5rem"
        height="5rem"
        animationType="movedocument"
        alt="document"
      />
      <Styledicon
        src={isDarkMode ? document1_dark : document1}
        visible={isGenerating}
        top="3.7rem"
        left="10rem"
        width="5rem"
        height="5rem"
        zindex="2"
        animationType="none"
        alt="document"
      />
      <Styledicon
        src={isDarkMode ? file_dark : file}
        visible={isGenerating}
        top="4.9rem"
        left="-14.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="movefile1"
        alt="file"
      />
      <Styledicon
        src={isDarkMode ? file_dark : file}
        visible={isGenerating}
        top="4.9rem"
        left="-14.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="movefile2"
        alt="file"
      />
      <Styledicon
        src={isDarkMode ? folder_dark : folder}
        visible={isGenerating}
        top="4.9rem"
        left="-14.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="movefolder1"
        alt="folder"
      />
      <Styledicon
        src={isDarkMode ? folder_dark : folder}
        visible={isGenerating}
        top="4.9rem"
        left="-14.5rem"
        width="3.5rem"
        height="3.5rem"
        zindex="2"
        animationType="movefolder2"
        alt="folder"
      />
    </AnimationWrapper>
  )
}

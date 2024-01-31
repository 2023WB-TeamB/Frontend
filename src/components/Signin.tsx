import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { styled, keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useApiUrlStore, useDarkModeStore } from '../../src/store/store'
/*-----------------------------------------------------------*/
import Register from './Register'
import GradientBtn from './GradientBtn'
import CloseBtn from './CloseBtn'
import { useModalStore } from './ModalStore'
/*-----------------------------------------------------------*/
import imgGoogle from '../assets/images/logo_google.png'
import imgGithub from '../assets/images/logo_github.png'
import imgMeta from '../assets/images/logo_meta.png'
import imgNaver from '../assets/images/logo_naver.png'

// 애니메이션
const modalOpenAnimation = keyframes`
//위에서 아래로 이동
  0% {
    transform: translateY(-100%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }
`
// 스타일
const Overlay = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
`
const Content = styled.div<{ $isDarkMode: boolean }>`
  position: relative;
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : 'white')};
  border-radius: 50px;
  width: 425px;
  height: 550px;
  animation: ${modalOpenAnimation} 0.55s ease-in-out;
  &:focus {
    outline: none; // focus될때 아웃라인 제거
  }
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyleedTitle = styled.div<{ $isDarkMode: boolean }>`
  font-size: 30px;
  font-weight: 300;
  /* font-family: 'Inter-Regular', Helvetica; */
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  margin-top: 50px;
  margin-bottom: 10px;
`
const StyledName = styled.div<{ $isDarkMode: boolean }>`
  width: 80%;
  font-size: 20px;
  font-weight: 200;
  /* font-family: 'Inter-Regular', Helvetica; */
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  margin-bottom: 3px;
`
const StyledInput = styled.input<{ $isDarkMode: boolean }>`
  height: 45px;
  width: 324px;
  font-size: 15px;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  border: 0.5px solid;
  border-color: ${(props) => (props.$isDarkMode ? '#5e5e5e' : '#c8c8c8')};
  border-radius: 15px;
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : 'white')};
  padding-left: 20px;
`
const StyledSocial = styled.img`
  width: 36px;
  height: 36px;
  margin-top: 50px;
  margin: 8px;
`
const StyledFont = styled.span<{ fontDark: string; fontLight: string; $isDarkMode: boolean }>`
  font-size: 15px;
  font-weight: 200;
  /* font-family: 'Inter-Regular', Helvetica; */
  color: ${(props) => (props.$isDarkMode ? props.fontDark : props.fontLight || 'black')};
  margin-bottom: 20px;
  cursor: pointer; /* 마우스를 손가락 형태로 변환 */
`
const StyledDivider = styled.div<{ $isDarkMode: boolean }>`
  width: 300px;
  height: 16px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  /* font-family: 'Inter'; */
  font-size: 16px;
  color: ${(props) => (props.$isDarkMode ? '#c8c8c8' : '#bbbbbb')};
  font-weight: 400;
`
// const StyledCheckbox = styled.input`
//   width: 15px;
//   height: 10px;

//   background-color: blue;
// `

// 메인
const Signin = () => {
  // const [rememberMe, setRememberMe] = useState(false) // remember me 상태
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode) // 다크모드 상태관리
  const { apiUrl } = useApiUrlStore()
  const navigate = useNavigate()
  const { isRegisterOpen, toggleRegister, toggleSignin } = useModalStore() // 모달 상태관리
  const modalRef = useRef<HTMLDivElement>(null) // DOM 이나 react Element 요소에 대한 참조를 생성한다
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  // input 상태관리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target //
    setData((prevData) => ({
      ...prevData, // 이전 데이터 같이
      [name]: value, // key값을 기준으로 value를 가져옴
    }))
  }
  // 로그인, 회원가입 모달 토글
  const handleClickJoinus = () => {
    toggleRegister() // 회원가입 모달 Open
    toggleSignin() // 로그인 모달 close
  }
  // Overlay를 클릭한 경우 모달 close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleSignin()
    }
  }
  // ESC 키를 누른 경우 모달 close
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleSignin()
    }
  }
  // 모달에 focus를 주어서 ESC키 이벤트가 발생하도록 한다.
  useEffect(() => {
    if (modalRef.current) {
      // 참조된 DOM요소를 확인하고 존재한다면
      modalRef.current.focus() // 해당 요소에 focus를 둔다
    }
  }, [])
  // usbmit 비동기 처리
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 리렌더링 방지
    try {
      // API 호출
      const response = await axios.post(`${apiUrl}/auth`, {
        email: data.email,
        password: data.password,
      })
      // 로그인 성공 시
      if (response.status === 200) {
        // 로컬 스토리지에 토큰 저장, response.data.token.[토큰이름] 은 서버에서 전달됨
        localStorage.setItem('accessToken', response.data.token.access)
        localStorage.setItem('refreshToken', response.data.token.refresh)
        console.log('API Response: ', response.status)
        Toast.fire({
          icon: 'success',
          title: 'Welcome!',
        })
        toggleSignin() // 동작 수행후 모달 닫기
        navigate('/mydocs') // 마이독스 페이지로 이동
      }
      // 로그인 실패 시
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('API Response: ', error.response.status)
        // 비밀번호 초기화
        setData((prevData) => ({
          ...prevData,
          password: '',
        }))
        Toast.fire({
          icon: 'error',
          title: 'Sign in failed',
          text: 'Please check your email or password',
        })
      }
    }
  }
  // sweetAlert2 toast창
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
  // 체크박스 상태관리
  // const handleCheckboxChange = () => {
  //   setRememberMe(!rememberMe) // TODO: true면 로그인 유지가 되게끔 api 연동
  // }
  return (
    <>
      <Overlay onClick={handleOverlayClick}>
        <Content $isDarkMode={$isDarkMode} onKeyDown={handleKeyPress} ref={modalRef} tabIndex={0}>
          <CloseBtn onClick={toggleSignin} isDarkMode={$isDarkMode} />
          <StyledForm onSubmit={handleSubmit}>
            <StyleedTitle $isDarkMode={$isDarkMode}>Sign in</StyleedTitle>
            {/* 이메일 */}
            <StyledName $isDarkMode={$isDarkMode}>Email</StyledName>
            <StyledInput
              $isDarkMode={$isDarkMode}
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {/* 비밀번호 */}
            <div style={{ margin: 8 }} />
            <StyledName $isDarkMode={$isDarkMode}>Password</StyledName>
            <StyledInput
              $isDarkMode={$isDarkMode}
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
              autoComplete="off"
            />
            {/* Remember me */}
            {/* <div style={{ margin: 8 }}></div>
            <div>
              <StyledCheckbox
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <StyledFont
                $isDarkMode={$isDarkMode}
                fontLight="#000"
                fontDark="#fff"
                onClick={handleCheckboxChange}>
                Rememeber me
              </StyledFont>
            </div> */}
            <div style={{ margin: 15 }} />
            {/* 로그인 버튼 */}
            <GradientBtn isDarkMode={$isDarkMode}>Sign in</GradientBtn>
            {/* 소셜 로그인 */}
            <div style={{ margin: 10 }} />
            <StyledDivider $isDarkMode>
              <div
                style={{
                  position: 'absolute',
                  width: 300,
                  height: 4,
                  borderBottom: $isDarkMode ? '0.5px solid #5e5e5e' : '0.5px solid #c8c8c8',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  height: 16,
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: $isDarkMode ? '#202020' : 'white',
                }}>
                &nbsp;or&nbsp;
              </div>
            </StyledDivider>
            <div style={{ margin: 8 }} />
            <div>
              <StyledSocial src={imgGoogle} />
              <StyledSocial src={imgGithub} />
              <StyledSocial src={imgMeta} />
              <StyledSocial src={imgNaver} />
              {/* TODO: 소셜로그인 기능 구현 */}
            </div>
            {/* Join us */}
            <div style={{ margin: 4 }} />
            <div>
              <StyledFont
                $isDarkMode={$isDarkMode}
                fontDark="#fff"
                fontLight="#000"
                onClick={handleClickJoinus}>
                Don&apos;t have an account? {/* &apos = "'" */}
              </StyledFont>
              <StyledFont
                $isDarkMode={$isDarkMode}
                fontDark="#7AC4E8"
                fontLight="#7AC4E8"
                onClick={handleClickJoinus}>
                Create one
              </StyledFont>
            </div>
          </StyledForm>
        </Content>
      </Overlay>
      {isRegisterOpen && <Register />}
    </>
  )
}

export default Signin

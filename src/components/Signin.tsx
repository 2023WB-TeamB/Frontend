import { useState, ChangeEvent, FormEvent } from 'react'
import { styled, keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDarkModeStore } from '../../src/store/store'
import axios from 'axios'
import Swal from 'sweetalert2'
/*-----------------------------------------------------------*/
import Register from './Register'
import GradientBtn from './GradientBtn'
import CloseBtn from './CloseBtn'
import { useModalStore } from './useModalStore'
/*-----------------------------------------------------------*/
import imgGoogle from '../assets/images/logo_google.png'
import imgGithub from '../assets/images/logo_github.png'
import imgMeta from '../assets/images/logo_meta.png'
import imgNaver from '../assets/images/logo_naver.png'

/**** 스타일 ****/
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
const Content = styled.div<{ isDarkMode: boolean }>`
  position: relative;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  border-radius: 50px;
  width: 425px;
  height: 580px;
  animation: ${modalOpenAnimation} 0.55s ease-in-out;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyleedTitle = styled.div<{ isDarkMode: boolean }>`
  font-size: 30px;
  font-weight: 300;
  font-family: 'Inter-Regular', Helvetica;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  margin-top: 50px;
  margin-bottom: 10px;
`
const StyledName = styled.div<{ isDarkMode: boolean }>`
  width: 80%;
  font-size: 20px;
  font-weight: 200;
  font-family: 'Inter-Regular', Helvetica;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  margin-bottom: 3px;
`
const StyledInput = styled.input<{ isDarkMode: boolean }>`
  height: 45px;
  width: 324px;
  font-size: 15px;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};

  border: 0.5px solid;
  border-color: ${(props) => (props.isDarkMode ? '#5e5e5e' : '#c8c8c8')};
  border-radius: 15px;

  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  padding-left: 20px;
`
const StyledSocial = styled.img`
  width: 36px;
  height: 36px;

  margin-top: 50px;
  margin: 8px;
`
const StyledFont = styled.span<{ fontDark: string; fontLight: string; isDarkMode: boolean }>`
  font-size: 15px;
  font-weight: 200;
  font-family: 'Inter-Regular', Helvetica;
  color: ${(props) => (props.isDarkMode ? props.fontDark : props.fontLight || 'black')};
  cursor: pointer; /* 마우스를 손가락 형태로 변환 */

  margin-bottom: 20px;
`
const StyledCheckbox = styled.input`
  width: 15px;
  height: 10px;

  background-color: blue;
`
const StyledDivider = styled.div<{ isDarkMode: boolean }>`
  width: 300px;
  height: 16px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  font-family: 'Inter';
  font-size: 16px;
  color: ${(props) => (props.isDarkMode ? '#c8c8c8' : '#bbbbbb')};
  font-weight: 400;
`

/**** 인터페이스 ****/
interface FormProps {
  email: string
  password: string
}

/**** 메인 ****/
function Signin() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false) // remember me 상태
  const { isRegisterOpen, toggleRegister, toggleSignin } = useModalStore()
  const [data, setData] = useState<FormProps>({
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
  // 모달 상태관리
  const handleClickJoinus = () => {
    toggleRegister() // 회원가입 모달 open
  }
  // 체크박스 상태관리
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe) // TODO: true면 로그인 유지가 되게끔 api 연동
  }
  // usbmit 비동기 처리
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const url = 'https://gitodoc.kro.kr/api/v1/auth' // 배포서버
    // const url = 'http://localhost:8000/api/v1/auth' // 개발서버
    e.preventDefault() // 리렌더링 방지
    try {
      // API 호출
      const response = await axios.post(url, {
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
          title: 'welcome!',
        })
        toggleSignin() // 동작 수행후 모달 닫기
        navigate('/mydocs') // 마이독스 페이지로 이동
      }
      // 로그인 실패 시
    } catch (error: any) {
      // error의 타입을 any로 명시해야함
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
  // sweetAlert2 toast창 라이브러리
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
  return (
    <>
      <Overlay>
        <Content isDarkMode={isDarkMode}>
          <CloseBtn onClick={toggleSignin} />
          <StyledForm onSubmit={handleSubmit}>
            <StyleedTitle isDarkMode={isDarkMode}>Sign in</StyleedTitle>
            {/* 이메일 */}
            <StyledName isDarkMode={isDarkMode}>Email</StyledName>
            <StyledInput
              isDarkMode={isDarkMode}
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {/* 비밀번호 */}
            <div style={{ margin: 8 }}></div>
            <StyledName isDarkMode={isDarkMode}>Password</StyledName>
            <StyledInput
              isDarkMode={isDarkMode}
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {/* Remember me */}
            <div style={{ margin: 8 }}></div>
            <div>
              <StyledCheckbox
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <StyledFont
                isDarkMode={isDarkMode}
                fontLight="#000"
                fontDark="#fff"
                onClick={handleCheckboxChange}>
                Rememeber me
              </StyledFont>
            </div>
            <div style={{ margin: 8 }}></div>
            {/* 로그인 버튼 */}
            <GradientBtn isDarkMode={isDarkMode}>Sign in</GradientBtn>
            {/* 소셜 로그인 */}
            <div style={{ margin: 10 }}></div>
            <StyledDivider isDarkMode>
              <div
                style={{
                  position: 'absolute',
                  width: 300,
                  height: 4,
                  borderBottom: isDarkMode ? '0.5px solid #5e5e5e' : '0.5px solid #c8c8c8',
                }}></div>
              <div
                style={{
                  position: 'absolute',
                  height: 16,
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor: isDarkMode ? '#202020' : 'white',
                }}>
                &nbsp;or&nbsp;
              </div>
            </StyledDivider>
            <div style={{ margin: 8 }}></div>
            <div>
              <StyledSocial src={imgGoogle} />
              <StyledSocial src={imgGithub} />
              <StyledSocial src={imgMeta} />
              <StyledSocial src={imgNaver} />
              {/* TODO: 소셜로그인 기능 구현 */}
            </div>
            {/* Join us */}
            <div style={{ margin: 4 }}></div>
            <div>
              <StyledFont isDarkMode={isDarkMode} fontDark="#fff" fontLight="#000">
                Join{' '}
              </StyledFont>
              <StyledFont
                isDarkMode={isDarkMode}
                fontDark="#7AC4E8"
                fontLight="#7AC4E8"
                onClick={handleClickJoinus}>
                us?
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

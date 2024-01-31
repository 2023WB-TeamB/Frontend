import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { styled, keyframes } from 'styled-components'
import axios from 'axios'
import Swal from 'sweetalert2'
/*-----------------------------------------------------------*/
import GradientBtn from './GradientBtn'
import CloseBtn from './CloseBtn'
import { useModalStore } from './ModalStore'
import { useApiUrlStore, useDarkModeStore } from '../store/store'

// 인터페이스
interface NameType {
  visibility?: string // 비지블
}
// 애니메이션
const modalOpenAnimation = keyframes`
// 가운데서 펼쳐지게
  0% {
    transform: translateY(0%) scale(0); 
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
const Content = styled.div<{ isDarkMode: boolean }>`
  position: relative;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : 'white')};
  border-radius: 50px;
  width: 425px;
  height: 630px;
  animation: ${modalOpenAnimation} 0.55s ease-in-out;
  &:focus {
    outline: none; // focus될때 아웃라인 제거
  }
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitle = styled.div<{ isDarkMode: boolean }>`
  font-size: 30px;
  font-weight: 300;
  /* font-family: 'Inter-Regular', Helvetica; */
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  margin-top: 50px;
  margin-bottom: 10px;
`
const StyledNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledName = styled.span<NameType & { isDarkMode: boolean }>`
  width: 170px;
  float: left;
  font-weight: 200;
  /* font-family: 'Inter-Regular', Helvetica; */
  text-align: left;
  font-size: 20px;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  margin-bottom: 3px;
`
const StyledName2 = styled.span<NameType>`
  width: 170px;
  height: 20px;
  float: right;
  font-weight: 400;
  /* font-family: 'Inter-Regular', Helvetica; */
  text-align: right;
  font-size: 13px;
  color: #cf4e4e;
  visibility: ${(props) => props.visibility};
  padding-top: 10px;
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
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#fff')};
  padding-left: 20px;
`
const StyledFont = styled.span<{ fontDark: string; fontLight: string; isDarkMode: boolean }>`
  font-size: 15px;
  font-weight: 200;
  /* font-family: 'Inter-Regular', Helvetica; */
  color: ${(props) => (props.isDarkMode ? props.fontDark : props.fontLight || 'black')};
  cursor: pointer; /* 마우스를 손가락 형태로 변환 */
  margin-bottom: 20px;
`
// 메인
const Register = () => {
  const [isError, setIsError] = useState(false) // 에러메세지 상태관리
  const { isSigninOpen, toggleRegister, toggleSignin } = useModalStore() // 모달 상태관리
  const { registerApiUrl } = useApiUrlStore()
  const isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const modalRef = useRef<HTMLDivElement>(null) // DOM 이나 react Element 요소에 대한 참조를 생성한다

  const [data, setData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  // 로그인, 회원가입 모달 토글
  const handleClickSignin = () => {
    toggleSignin() // 로그인 모달 open
    toggleRegister() // 회원가입 모달 close
  }
  // Overlay를 클릭한 경우 모달 close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleRegister() // 회원가입 모달 close
    }
  }
  // ESC 키를 누른 경우 모달 close
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleRegister() // 회원가입 모달 close
    }
  }
  // 모달에 focus를 주어서 ESC키 이벤트가 발생하도록 한다.
  useEffect(() => {
    if (modalRef.current) {
      // 참조된 DOM요소를 확인하고 존재한다면
      modalRef.current.focus() // 해당 요소에 focus를 둔다
    }
  }, [])
  // 비밀번호가 틀리면 에러 메시지와 표시스타일 변경
  const handlePasswordMismatch = () => {
    setIsError(true)
  }
  // input 상태 이벤트 헨들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    // 비밀번호가 일치하지 않으면 상태 업데이트
    // password의 value와 confirmPassword의 value와 다르면
    if (name === 'confirmPassword' && data.password !== value) {
      handlePasswordMismatch()
    } else {
      // 비밀번호가 일치하면 에러메세지 숨김
      setIsError(false)
    }
  }
  // submit 비동기 처리
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // form요소에서 발생하는 페이지를 다시 로드하는 새로고침 방지
    // 비밀번호와 비밀번호 확인의 일치 여부 확인
    if (data.password !== data.confirmPassword) {
      return // submit 중단
    }
    try {
      // API 호출
      const response = await axios.post(`${registerApiUrl}`, {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      })
      // 회원가입 성공 시
      if (response.status === 200) {
        // console.log(response.data)
        console.log('API Response: ', response.status)
        Toast.fire({
          icon: 'success',
          title: 'Registration successful!',
        })
        toggleRegister() // 동작 수행후 모달 닫기
      }
      // 회원가입 실패 시
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('API Response: ', error.response.status)
        Swal.fire({
          // 로그아웃 알림창
          title: 'Registration failed!',
          text: 'Please check the form again',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
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
  return (
    <>
      <Overlay onClick={handleOverlayClick}>
        <Content isDarkMode={isDarkMode} onKeyDown={handleKeyPress} ref={modalRef} tabIndex={0}>
          <CloseBtn onClick={toggleRegister} isDarkMode={isDarkMode} />
          <StyledForm onSubmit={handleSubmit}>
            <StyledTitle isDarkMode={isDarkMode}>Register</StyledTitle>
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Email</StyledName>
              <StyledName2 visibility="hidden">Wrong Email</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Email"
              autoComplete="off"
            />
            {/* 닉네임 */}
            <div style={{ margin: 8 }} />
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Nickname</StyledName>
              <StyledName2 visibility="hidden">Wrong Nickname</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="text"
              name="nickname"
              value={data.nickname}
              onChange={handleChange}
              placeholder="Enter Nickname"
              autoComplete="off"
            />
            {/* 비밀번호 */}
            <div style={{ margin: 8 }} />
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Password</StyledName>
              <StyledName2 visibility="hidden">Wrong Password</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
              autoComplete="off"
            />
            {/* 비밀번호 확인 */}
            <div style={{ margin: 8 }} />
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Confirm Password</StyledName>
              <StyledName2 visibility={isError ? 'visible' : 'hidden'}>Wrong Password</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              style={{
                border: isError
                  ? '2px solid #CF4E4E'
                  : isDarkMode
                    ? '0.5px solid #5e5e5e'
                    : '0.5px solid #c8c8c8',
              }}
              autoComplete="off"
            />
            {/* SUBMIT 버튼 */}
            <div style={{ margin: 15 }} />
            <GradientBtn isDarkMode={isDarkMode}>Submit</GradientBtn>
            {/* signin */}
            <div style={{ margin: 10 }} />
            <div>
              <StyledFont
                isDarkMode={isDarkMode}
                fontDark="#fff"
                fontLight="#000"
                onClick={handleClickSignin}>
                Have an account?{' '}
              </StyledFont>
              <StyledFont
                isDarkMode={isDarkMode}
                fontDark="#7AC4E8"
                fontLight="#7AC4E8"
                onClick={handleClickSignin}>
                Sign in
              </StyledFont>
            </div>
          </StyledForm>
        </Content>
      </Overlay>
      {isSigninOpen && <Register />}
    </>
  )
}

export default Register

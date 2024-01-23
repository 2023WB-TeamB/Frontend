import { useState, ChangeEvent, FormEvent } from 'react'
import { styled, keyframes } from 'styled-components'
import { useDarkModeStore } from '../../src/store/store'
import axios from 'axios'
import Swal from 'sweetalert2'
/*-----------------------------------------------------------*/
import GradientBtn from './GradientBtn'
import CloseBtn from './CloseBtn'
import { useModalStore } from './useModalStore'

/**** 스타일 ****/
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
  border-radius: 80px;
  width: 450px;
  height: 600px;
  animation: ${modalOpenAnimation} 0.55s ease-in-out;
`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitle = styled.div<{ isDarkMode: boolean }>`
  font-size: 30px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  margin-top: 50px;
  margin-bottom: 10px;
`
const StyledNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledName = styled.span<NameProps & { isDarkMode: boolean }>`
  width: 170px;
  float: left;

  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  text-align: left;
  font-size: 20px;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};

  margin-bottom: 3px;
`
const StyledName2 = styled.span<NameProps>`
  width: 170px;
  height: 20px;
  float: right;

  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  text-align: right;
  font-size: 13px;
  color: red;

  visibility: ${(props) => props.visibility};
  padding-top: 10px;
  margin-bottom: 3px;
`
const StyledInput = styled.input<{ isDarkMode: boolean }>`
  height: 40px;
  width: 350px;
  font-size: 15px;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};

  border: 1px solid;
  border-color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  border-radius: 20px;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#fff')};
  padding-left: 20px;
`
/**** 인터페이스 ****/
interface FormProps {
  email: string
  nickname: string
  password: string
  confirmPassword: string
}
interface NameProps {
  visibility?: string // 비지블
}
/**** 메인 ****/
function Register() {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const [data, setData] = useState<FormProps>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const [showError, setShowError] = useState(false) // 에러메세지 상태관리
  const { toggleRegister } = useModalStore() // 모달 상태관리
  // 비밀번호 불일치 시에러 메시지와 표시스타일 변경
  const handlePasswordMismatch = () => {
    setShowError(true)
  }
  // input 상태 이벤트 헨들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    // 비밀번호가 일치하지 않으면 상태 업데이트
    if (name === 'confirmPassword' && data.password !== value) {
      // 비밀번호 확인의 onChange일때만
      // password의 value와 confirmPassword의 value와 다르면
      handlePasswordMismatch()
    } else {
      // 비밀번호가 다시 일치하면 에러를 숨긴다
      setShowError(false)
    }
  }
  // submit 비동기 처리
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // form요소에서 발생하는 페이지를 다시 로드하는 새로고침 방지
    const url = 'https://gitodoc.kro.kr/api/v1/register' // 배포서버
    // const url = `http://localhost:8000/api/v1/register` // 개발서버
    // 비밀번호와 비밀번호 확인의 일치 여부 확인
    if (data.password !== data.confirmPassword) {
      handlePasswordMismatch()
      return // submit 중단
    }
    try {
      // API 호출
      const response = await axios.post(url, {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      })
      // 회원가입 성공 시
      if (response.status === 200) {
        console.log(response.data)
        console.log('API Response: ', response.status)
        // alert('회원가입 성공!')
        Toast.fire({
          icon: 'success',
          title: '회원가입에 성공하였습니다.',
        })
        toggleRegister() // 동작 수행후 모달 닫기
      }
      // 회원가입 실패 시
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('API Response: ', error.response.status)
        // alert('회원가입 실패!')
        Toast.fire({
          icon: 'success',
          title: '회원가입에 실패하였습니다.',
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
          <CloseBtn onClick={toggleRegister} />
          <StyledForm onSubmit={handleSubmit}>
            <StyledTitle isDarkMode={isDarkMode}>Register</StyledTitle>
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Email</StyledName>
              <StyledName2 visibility="hidden">Worng Email</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {/* 닉네임 */}
            <div style={{ margin: 10 }}></div>
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Nickname</StyledName>
              <StyledName2 visibility="hidden">Worng Nickname</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="text"
              name="nickname"
              value={data.nickname}
              onChange={handleChange}
              placeholder="Enter Nickname"
            />
            {/* 비밀번호 */}
            <div style={{ margin: 10 }}></div>
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>Password</StyledName>
              <StyledName2 visibility="hidden">Worng Password</StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {/* 비밀번호 확인 */}
            <div style={{ margin: 10 }}></div>
            <StyledNameWrapper>
              <StyledName isDarkMode={isDarkMode}>ConfirmPassword</StyledName>
              <StyledName2 visibility={showError ? 'visible' : 'hidden'}>
                Worng Password
              </StyledName2>
            </StyledNameWrapper>
            <StyledInput
              isDarkMode={isDarkMode}
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              style={{
                border: showError ? '2px solid red' : '1px solid',
              }}
            />
            {/* SUBMIT 버튼 */}
            <div style={{ margin: 20 }}></div>
            <GradientBtn isDarkMode={isDarkMode}>Submit</GradientBtn>
          </StyledForm>
        </Content>
      </Overlay>
    </>
  )
}

export default Register

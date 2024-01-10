import { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import axios from 'axios'
import imgCloseBtn from '../assets/images/close.png'

ReactModal.setAppElement('#root')

/**** 스타일 ****/
const CustomModal = {
  content: {
    width: '450px',
    maxHeight: '600px',
    backgroundColor: '#fff',
    borderRadius: '80px',
    margin: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTitle = styled.div`
  font-size: 30px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: #000000;
  margin-top: 50px;
  margin-bottom: 10px;
`
const StyledNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledName = styled.span<NameProps>`
  width: 170px;
  float: left;

  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  text-align: left;
  font-size: 20px;
  color: black;

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
const StyledInput = styled.input`
  height: 40px;
  width: 350px;
  font-size: 15px;
  color: #000;

  border: 1px solid;
  border-color: #000;
  border-radius: 20px;
  background-color: #fff;
  padding-left: 20px;
`
const StyledButton = styled.button`
  height: 46px;
  width: 150px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(to right, #a26be1, #79c5e8);
  box-shadow: 2px 4px 5px #0000001f;

  font-family: 'Inter-Regular', Helvetica;
  font-size: 20px;
  color: #fff;

  cursor: pointer;

  &:hover {
    background: linear-gradient(to right, #7f58ab, #4e95b6);
  }
`
const StyledCloseBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  height: 20px;
  width: 20px;

  font-size: 12px;
  font-weight: 400;

  border: 0;
  background-color: transparent;
  background-image: url(${imgCloseBtn});
  background-position: center;

  cursor: pointer;
`
/**** 인터페이스 ****/
interface RegisterProps {
  isOpen: boolean
  onClose: () => void
}
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
function Register({ isOpen, onClose }: RegisterProps) {
  const [data, setData] = useState<FormProps>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const [showError, setShowError] = useState(false)
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
  // submit 이벤트 핸들러
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // form요소에서 발생하는 페이지를 다시 로드하는 새로고침 방지

    // 비밀번호와 비밀번호 확인의 일치 여부 확인
    if (data.password !== data.confirmPassword) {
      handlePasswordMismatch()
      return // submit 중단
    }

    try {
      // API 호출
      const response = await axios.post('http://gtd.kro.kr:8000/api/v1/register/', {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      })
      // 회원가입 성공 시
      if (response.status === 200) {
        console.log(response.data)
        console.log('API Response: ', response.status)
        alert('회원가입 성공!')

        onClose() // 동작 수행후 모달 닫기
      }
      // 회원가입 실패 시
    } catch (error: any) {
      if (error.response.status === 400) {
        console.error('API Response: ', error.response.status)
        alert('회원가입 실패!')
      }
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      style={CustomModal}>
      <StyledCloseBtn onClick={onClose} />
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>Register</StyledTitle>
        <StyledNameWrapper>
          <StyledName>Email</StyledName>
          <StyledName2 visibility="hidden">Worng Email</StyledName2>
        </StyledNameWrapper>
        <StyledInput
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />

        <div style={{ margin: 10 }}></div>
        <StyledNameWrapper>
          <StyledName>Nickname</StyledName>
          <StyledName2 visibility="hidden">Worng Nickname</StyledName2>
        </StyledNameWrapper>
        <StyledInput
          type="text"
          name="nickname"
          value={data.nickname}
          onChange={handleChange}
          placeholder="Enter Nickname"
        />

        <div style={{ margin: 10 }}></div>
        <StyledNameWrapper>
          <StyledName>Password</StyledName>
          <StyledName2 visibility="hidden">Worng Password</StyledName2>
        </StyledNameWrapper>
        <StyledInput
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />

        <div style={{ margin: 10 }}></div>
        <StyledNameWrapper>
          <StyledName>ConfirmPassword</StyledName>
          <StyledName2 visibility={showError ? 'visible' : 'hidden'}>Worng Password</StyledName2>
        </StyledNameWrapper>
        <StyledInput
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="Enter Confirm Password"
          style={{
            border: showError ? '2px solid red' : '1px solid',
          }}
        />
        <div style={{ margin: 20 }}></div>
        <StyledButton>Submit</StyledButton>
      </StyledForm>
    </ReactModal>
  )
}

export default Register

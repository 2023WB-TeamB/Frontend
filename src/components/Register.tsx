import { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import imgCloseBtn from '../assets/images/close.png'
import imgDecoBar from '../assets/images/deco_bar.png'
import axios from 'axios'

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
const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: #000000;
  margin-top: 50px;
  margin-bottom: 10px;
`
const Name = styled.div`
  width: 80%;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: #000;
  /* margin-left: 80px; */
  margin-bottom: 5px;
`
const Input = styled.input`
  height: 40px;
  width: 350px;
  font-size: 15px;
  color: #000;

  border: 1px solid;
  border-color: #000;
  border-radius: 20px;
  background-color: #fff;

  padding-left: 20px;
  margin-bottom: 20px;
`
const Button = styled.button`
  height: 46px;
  width: 150px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(to right, #a26be1, #79c5e8);
  box-shadow: 2px 4px 5px #0000001f;

  font-family: 'Inter-Regular', Helvetica;
  font-size: 20px;
  color: #fff;

  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to right, #7f58ab, #4e95b6);
  }
`
const CloseBtn = styled.button`
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

/**** 메인 ****/
function Register({ isOpen, onClose }: RegisterProps) {
  const [data, setData] = useState<FormProps>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      // API 호출
      const response = await axios.post('api/v1/register/', {
        email: data.email,
        nickname: data.nickname,
        password: data.password,
      })
      console.log('API Response: ', response.status)
      if (response.status === 200) {
        alert('Register Success!')
        // 동작 수행후 모달 닫기
        onClose()
      }
    } catch (error) {
      // API 호출 중 오류 발생 시 에러 표시
      console.error('API ERROR: ', error)
    }
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      style={CustomModal}>
      <CloseBtn onClick={onClose} />
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register</Title>
        <Name>Email</Name>
        <Input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <Name>Nickname</Name>
        <Input
          type="text"
          name="nickname"
          value={data.nickname}
          onChange={handleChange}
          placeholder="Enter Nickname"
        />
        <Name>Password</Name>
        <Input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <Name>Confirm Password</Name>
        <Input
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="Enter Confirm Password"
        />
        <Button>Submit</Button>
        <img src={imgDecoBar} alt="" />
      </RegisterForm>
    </ReactModal>
  )
}

export default Register

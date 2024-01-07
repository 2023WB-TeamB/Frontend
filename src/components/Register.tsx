import { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import imgCloseBtn from '../assets/images/close.png'
import imgDecoBar from '../assets/images/deco_bar.png'

ReactModal.setAppElement('#root')

/**** 스타일 ****/
const CustomModal = {
  content: {
    // maxWidth: '450px',
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
  height: 30px;
  width: 350px;
  font-size: 15px;
  color: #000;

  border: 1px solid;
  border-color: #000;
  border-radius: 20px;
  background-color: #fff;
  /* box-shadow: 2px 4px 5px #0000001f; */

  padding-left: 20px;
  /* margin-left: 20px; */
  /* margin-right: 20px; */
  margin-bottom: 30px;
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
  border: 0;
  background-color: transparent;
  background-image: url(${imgCloseBtn});
  background-position: center;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
`
/**** 인터페이스 ****/
interface RegisterProps {
  isOpen: boolean
  onClose: () => void
}
// 유저 개인정보를 담을 임시 객체 생성
interface FormProps {
  id: string
  password: string
  confirmPassword: string
  email: string
}

/**** 메인 ****/
function Register({ isOpen, onClose }: RegisterProps) {
  const [data, setData] = useState<FormProps>({
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form:', data)
    onClose()
  }

  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false}
        style={CustomModal}>
        <CloseBtn onClick={onClose} />

        <RegisterForm onSubmit={handleSubmit}>
          <Title>Register</Title>
          <Name>ID</Name>
          <Input
            type="text"
            name="id"
            value={data.id}
            onChange={handleChange}
            placeholder="Enter ID"
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
            placeholder="Enter Password"
          />
          <Name>Email</Name>
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <Button>Submit</Button>
          <img src={imgDecoBar} alt="" />
        </RegisterForm>
      </ReactModal>
    </>
  )
}

export default Register

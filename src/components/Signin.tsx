import { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import imgStyledCloseBtn from '../assets/images/close.png'
import imgGoogle from '../assets/images/logo_google.png'
import imgGithub from '../assets/images/logo_github.png'
import imgMeta from '../assets/images/logo_meta.png'
import imgNaver from '../assets/images/logo_naver.png'
import imgDecoBar from '../assets/images/deco_bar.png'

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
const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyleedTitle = styled.div`
  font-size: 30px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: #000000;
  margin-top: 50px;
  margin-bottom: 10px;
`
const StyledName = styled.div`
  width: 80%;
  font-size: 20px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: #000;
  margin-bottom: 5px;
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
  margin-bottom: 30px;
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

  margin: 20px 0;
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
  background-image: url(${imgStyledCloseBtn});
  background-position: center;

  cursor: pointer;
`
const StyledSocial = styled.img`
  width: 50px;
  height: 50px;

  margin-top: 50px;
  margin: 15px;
`
const StyledFont = styled.span`
  font-size: 15px;
  font-weight: 400;
  font-family: 'Inter-Regular', Helvetica;
  color: ${(props) => props.color};

  margin-bottom: 20px;
`
const StyledCheckbox = styled.input`
  width: 15px;
  height: 10px;

  background-color: blue;

  margin-bottom: 20px;
`
/**** 인터페이스 ****/
interface SigninProps {
  isOpen: boolean
  onClose: () => void
}
interface FormProps {
  email: string
  password: string
}
/**** 메인 ****/
function Signin({ isOpen, onClose }: SigninProps) {
  const [data, setData] = useState<FormProps>({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)
  // input 상태관리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target //
    setData((prevData) => ({
      ...prevData, // 이전 데이터 같이
      [name]: value, // key값을 기준으로 value를 가져옴
    }))
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form:', data)
    // TODO: 데이터 유효성 검사
    onClose()
  }
  // 체크박스 상태관리
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe)
  }
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose} // 모달이 닫힐때 시작할 함수를 지정
      shouldCloseOnOverlayClick={false} // 모달의 오버레이를 클릭시 닫히는걸 방지
      style={CustomModal}>
      <StyledCloseBtn onClick={onClose} />
      <SigninForm onSubmit={handleSubmit}>
        <StyleedTitle>Sign in</StyleedTitle>
        {/* 이메일 */}
        <StyledName>Email</StyledName>
        <StyledInput
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        {/* 비밀번호 */}
        <StyledName>Password</StyledName>
        <StyledInput
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        {/* Remember me */}
        <div>
          <StyledCheckbox
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleCheckboxChange}
          />
          <StyledFont color="#000">Rememeber me</StyledFont>
        </div>
        {/* 로그인 버튼 */}
        <StyledButton>Sign in</StyledButton>
        {/* 소셜 로그인 */}
        <div>
          <StyledSocial src={imgGoogle} />
          <StyledSocial src={imgGithub} />
          <StyledSocial src={imgMeta} />
          <StyledSocial src={imgNaver} />
          {/* TODO: 기능구현 */}
        </div>
        {/* forgot password */}
        <div>
          <StyledFont color="#000">Forgot</StyledFont>
          <StyledFont color="#7AC4E8"> password?</StyledFont>
          {/* 기능구현 안함 */}
        </div>
        {/* 데코 */}
        <img src={imgDecoBar} style={{ marginTop: '20px' }} />
      </SigninForm>
    </ReactModal>
  )
}

export default Signin

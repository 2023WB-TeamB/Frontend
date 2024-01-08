import { useState } from 'react'
import Signin from '../components/Signin.tsx'
import Register from '../components/Register'
import Header from '../components/Header'

function MainPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigninOpen, setIsSigninOpen] = useState(false)
  const isLogin: boolean = false // 기본값은 로그아웃 상태

  /* 모달 이벤트 핸들러 */
  // 회원가입 핸들러
  const handleRegisterOpen = () => {
    setIsOpen(true)
  }
  const handleRegisterClose = () => {
    setIsOpen(false)
  }
  // 로그인 핸들러
  const handleSigninOpen = () => {
    setIsSigninOpen(true)
  }
  const handleSigninClose = () => {
    setIsSigninOpen(false)
  }

  return (
    <div>
      <Header isLogin={isLogin} />
      <h1>GiToDoc</h1>
      <p>Join us to change github repository to file!</p>
      {/* Resister 모달을 띄우기 위한 임시 버튼 */}
      <button onClick={handleRegisterOpen}>회원가입</button>
      <Register isOpen={isOpen} onClose={handleRegisterClose} />
      {/* Signin 모달을 띄우기 위한 임시 버튼 */}
      <button onClick={handleSigninOpen}>로그인</button>
      <Signin isOpen={isSigninOpen} onClose={handleSigninClose} />
    </div>
  )
}

export default MainPage

import { useState } from 'react'
import Register from '../components/Register'
import Header from '../components/Header'

function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  /* 모달 이벤트 핸들러 */
  // 모달 열기
  const handleModalOpen = () => {
    setIsOpen(true)
  }
  // 모달 닫기
  const handleModalClose = () => {
    setIsOpen(false)
  }
  const isLogin: boolean = false // 기본값은 로그아웃 상태

  return (
    <div>
      <Header isLogin={isLogin} />
      <h1>GiToDoc</h1>
      <p>Join us to change github repository to file!</p>

      {/* Resister 모달을 띄우기 위한 임시 버튼 */}
      <button onClick={handleModalOpen}>모달 테스트 버튼</button>
      <Register isOpen={isOpen} onClose={handleModalClose} />
    </div>
  )
}

export default MainPage

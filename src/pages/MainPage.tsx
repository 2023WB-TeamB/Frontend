import { useState } from 'react'
import Register from '../components/Register'
import Header from '../components/Header'

function MainPage() {
  const [isOpen, setIsOpen] = useState(false)

  const handleModalOpen = () => {
    setIsOpen(true)
  }

  const handleModalClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <Header />
      <h1>GiToDoc</h1>
      <p>Join us to change github repository to file!</p>

      {/* Resister 모달을 띄우기 위한 임시 버튼 */}
      <button onClick={handleModalOpen}>모달 테스트 버튼</button>
      <Register isOpen={isOpen} onClose={handleModalClose} />
    </div>
  )
}

export default MainPage

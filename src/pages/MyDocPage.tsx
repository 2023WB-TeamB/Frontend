import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

function MyDocPage() {
  /* 로그인 이벤트 핸들러 */
  const [isLogin, setIsLogin] = useState(true) // 기본값은 로그인이 된 상태
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLogin(false) // 로그아웃
    navigate('/') // 메인페이지로 이동
  }

  return (
    <div>
      <Header isLogin={isLogin} onLogout={handleLogout} />
      <h1>GiToDoc</h1>
      <p>Create your own amazing technical documents with just a Repository URL!</p>
    </div>
  )
}

export default MyDocPage

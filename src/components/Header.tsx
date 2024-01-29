import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
/*----------------------------------------------------------*/
import Signin from './Signin'
import { useModalStore } from './useModalStore'
import SearchList from './SearchList'
import { useDarkModeStore } from '../store/store'
/*-----------------------------------------------------------*/
import imgDarkMode from '../assets/images/moon.svg'
import imgWhiteMode from '../assets/images/sun.svg'
import imgLogo from '../assets/images/LOGO1.svg'
import imgSearch from '../assets/images/search.svg'
import imgSearchDark from '../assets/images/search_dark.svg'

// 인터페이스
interface HeaderType {
  isGetToken: boolean
}
interface IconType {
  height: string
  width: string
  $isDarkMode?: boolean
}
interface ContainerType {
  $isDarkMode: boolean
  // showBorder: boolean
}
interface SignType {
  $isDarkMode: boolean
}
// 스타일
const Container = styled.div<ContainerType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 255px);
  height: 7.5vh;
  position: absolute;
  border-color: black;
  background-color: ${(props) => (props.$isDarkMode ? '#202020' : '#fff')};
  padding: 0 7.5rem;
  z-index: 3;
  transition: ease 0.5s;

  @media (max-width: 760px) {
    width: calc(100% - 150px);
    padding: 0 3.4rem 0 5rem;
  }
`
const Logo = styled.img`
  width: 2rem;
  height: 2rem;
`
const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Icon = styled.img<IconType>`
  display: flex;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    border-radius: 50%;
    background: ${(props) => (props.$isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  }
`
const SignInOut = styled.div<SignType>`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => (props.$isDarkMode ? 'white' : '#C8C8C8')};
  margin-left: 10px;
  cursor: pointer;
`
// 메인
const Header: React.FC<HeaderType> = ({ isGetToken }) => {
  const { $isDarkMode, toggleDarkMode } = useDarkModeStore()
  const { isSigninOpen, toggleSignin, isSearchListOpen, searchListOpen } = useModalStore()
  const navigate = useNavigate()

  // 로그인 모달 클릭 이벤트
  const handleClickSignin = () => {
    toggleSignin() // 로그인 open/close 토글
  }
  // 다크모드 클릭 이벤트
  const handleDarkMode = () => {
    toggleDarkMode() // prev: 이전 요소의 값, 다크모드 상태를 토글
  }
  // 검색 모달 클릭 이벤트
  const handleClickSearch = async (e: React.MouseEvent) => {
    e.preventDefault()
    searchListOpen()
  }
  // 로그아웃 API 호출 이벤트
  const handleClickSignout = async () => {
    const url = 'https://gitodoc.kro.kr/api/v1/auth' // 배포 서버
    const response = await axios.delete(url)
    // 로그아웃 알림창
    Swal.fire({
      title: 'Sign out',
      text: 'Do you want to signed out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      // 로그아웃 확인 클릭 시
      if (result.isConfirmed) {
        Swal.fire({
          // title: '로그아웃',
          text: "You're signed out of GiToDoc",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
        // 로그아웃 성공 시
        if (response.status === 202) {
          console.log('API Response: ', response.status)
          // 로컬스토리지에서 토큰 삭제
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          navigate('/') // 메인페이지로 이동
        }
      }
    })
  }

  return (
    <>
      {isGetToken ? (
        <Container $isDarkMode={$isDarkMode}>
          <Logo src={imgLogo} />
          <RightWrapper>
            {/* 다크모드 */}
            <Icon
              $isDarkMode={$isDarkMode}
              src={$isDarkMode ? imgDarkMode : imgWhiteMode}
              height="2.2rem"
              width="2.2rem"
              onClick={handleDarkMode}
            />
            {/* 로그인 */}
            <SignInOut $isDarkMode={$isDarkMode} onClick={handleClickSignin}>
              Sign-in
            </SignInOut>
          </RightWrapper>
        </Container>
      ) : (
        <Container $isDarkMode={$isDarkMode}>
          <Logo src={imgLogo} />
          <RightWrapper>
            {/* 검색 */}
            <Icon
              $isDarkMode={$isDarkMode}
              src={$isDarkMode ? imgSearchDark : imgSearch}
              height="2.4rem"
              width="2.4rem"
              onClick={handleClickSearch}
            />
            {/* 다크모드 */}
            <Icon
              $isDarkMode={$isDarkMode}
              src={$isDarkMode ? imgDarkMode : imgWhiteMode}
              height="2.2rem"
              width="2.2rem"
              onClick={handleDarkMode}
            />
            {/* 로그아웃 */}
            <SignInOut $isDarkMode={$isDarkMode} onClick={handleClickSignout}>
              Sign-out
            </SignInOut>
          </RightWrapper>
        </Container>
      )}
      {/* 모달 */}
      {isSearchListOpen && <SearchList />}
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Header

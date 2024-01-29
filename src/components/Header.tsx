import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
/*----------------------------------------------------------*/
import Signin from './Signin'
import { useModalStore } from './ModalStore'
import SearchList from './SearchList'
import { useDarkModeStore, useViewerPageOpenStore, useConfirmBoxStore } from '../store/store'
import ModalOptions from '../components/ViewEdit/ModalOptions'
import ModalConfirm from '../components/ViewEdit/ModalConfirm'
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
  isDarkMode?: boolean
}
interface ContainerType {
  isDarkMode: boolean
  // showBorder: boolean
}
interface SignType {
  isDarkMode: boolean
}
// 스타일
const Container = styled.div<ContainerType>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 255px);
  height: 50px;
  position: fixed;
  border-color: black;
  background-color: ${(props) => (props.isDarkMode ? '#202020' : '#fff')};
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
    background: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  }
`
const SignInOut = styled.div<SignType>`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${(props) => (props.isDarkMode ? 'white' : '#C8C8C8')};
  margin-left: 10px;
  cursor: pointer;
`
// 메인
const Header: React.FC<HeaderType> = ({ isGetToken }) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore()
  const { isSigninOpen, toggleSignin, isSearchListOpen, searchListOpen } = useModalStore()
  const navigate = useNavigate()
  const openerStore = useViewerPageOpenStore()
  const confirmBoxStore = useConfirmBoxStore()
  const [confirmLabel, setConfirmLabel] = useState('')
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null)

  // 로그인 모달 클릭 이벤트
  const handleClickSignin = () => {
    toggleSignin() // 로그인 open/close 토글
  }
  // 다크모드 클릭 이벤트
  const handleDarkMode = () => {
    toggleDarkMode() // prev: 이전 요소의 값, 다크모드 상태를 토글
  }
  // 검색 모달 클릭 이벤트 핸들러
  const handleClickSearch = async (e: React.MouseEvent) => {
    e.preventDefault()
    searchListOpen()
  }
  // 확인 모달창 핸들러
  const handleConfirmYes = () => {
    if (confirmAction) confirmAction()
    confirmBoxStore.closeConfirm()
  }
  // Signout 클릭 이벤트 핸들러
  const handleClickSignout = () => {
    setConfirmLabel('Are you sure you want to leave this page?')
    setConfirmAction(() => () => {
      handleSignout()
    })
    confirmBoxStore.setConfirmLabel(confirmLabel)
    confirmBoxStore.openConfirm()
  }

  // 로그아웃 API 호출 이벤트
  const handleSignout = async () => {
    const url = 'https://gitodoc.kro.kr/api/v1/auth' // 배포 서버
    const response = await axios.delete(url)
    // 로그아웃 성공 시
    if (response.status === 202) {
      console.log('API Response: ', response.status)
      // 로컬스토리지에서 토큰 삭제
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate('/') // 메인페이지로 이동
    }
  }

  return (
    <>
      {isGetToken ? (
        <Container isDarkMode={isDarkMode}>
          <Logo src={imgLogo} />
          <RightWrapper>
            {/* 다크모드 */}
            <Icon
              isDarkMode={isDarkMode}
              src={isDarkMode ? imgDarkMode : imgWhiteMode}
              height="2.2rem"
              width="2.2rem"
              onClick={handleDarkMode}
            />
            {/* 로그인 */}
            <SignInOut isDarkMode={isDarkMode} onClick={handleClickSignin}>
              Sign-in
            </SignInOut>
          </RightWrapper>
        </Container>
      ) : (
        <Container isDarkMode={isDarkMode}>
          <Logo src={imgLogo} />
          <RightWrapper>
            {/* 검색 */}
            <Icon
              isDarkMode={isDarkMode}
              src={isDarkMode ? imgSearchDark : imgSearch}
              height="2.4rem"
              width="2.4rem"
              onClick={handleClickSearch}
            />
            {/* 다크모드 */}
            <Icon
              isDarkMode={isDarkMode}
              src={isDarkMode ? imgDarkMode : imgWhiteMode}
              height="2.2rem"
              width="2.2rem"
              onClick={handleDarkMode}
            />
            {/* 로그아웃 */}
            <SignInOut isDarkMode={isDarkMode} onClick={handleClickSignout}>
              Sign-out
            </SignInOut>
          </RightWrapper>
        </Container>
      )}
      <ModalOptions isOpenOptions={openerStore.isOpenOptions} onClose={openerStore.closeOptions} />
      <ModalConfirm
        isOpenConfirm={confirmBoxStore.isOpenConfirm}
        label={confirmLabel}
        confirmOption={[
          ['Yes', handleConfirmYes],
          ['No', confirmBoxStore.closeConfirm],
        ]}
      />
      {/* 모달 */}
      {isSearchListOpen && <SearchList />}
      {isSigninOpen && <Signin />}
    </>
  )
}

export default Header

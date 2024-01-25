//closebtn.tsx

import styled from 'styled-components'
import imgCloseBtn from '../assets/images/close.png'

const CloseBtn = styled.button<{ isDarkMode: boolean }>`
  position: absolute;
  top: 30px;
  right: 50px;
  height: 25px;
  width: 25px;
  padding: 15px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent; // 배격색과 동일하게
  background-image: url(${imgCloseBtn});
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isDarkMode ? '#2b2b2b' : '#F5F5F5')};
  }
`

export default CloseBtn

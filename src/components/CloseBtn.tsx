//closebtn.tsx

import styled from 'styled-components'
import imgCloseBtn from '../assets/images/close.png'

const CloseBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  height: 25px;
  width: 25px;
  margin: 0;
  padding: 0;
  background-position: center;
  /* background-size: cover; */
  background-repeat: no-repeat;
  background-color: transparent; // 배격색과 동일하게
  background-image: url(${imgCloseBtn});

  cursor: pointer;
`

export default CloseBtn

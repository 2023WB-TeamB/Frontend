import styled from 'styled-components'
import imgCloseBtn from '../assets/images/close.png'

const CloseBtn = styled.img`
  position: absolute;
  top: 30px;
  right: 50px;
  height: 20px;
  width: 20px;

  border: 0; // 이미지 테두리가 지워지지 않는다..
  background-color: transparent; // 배격색과 동일하게
  background-image: url(${imgCloseBtn});

  cursor: pointer;
`

export default CloseBtn

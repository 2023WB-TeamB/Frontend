import styled from 'styled-components'
import Swal from 'sweetalert2'
import { cardColorStore, isDeleteStore, modalOpenStore, previewOpenStore } from '../../store/store'

// SVG 파일의 내용을 아래와 같이 React 컴포넌트로 변환합니다.
const DeleteIcon = ({ color }: { color: string }) => (
  <svg width="25" height="24" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.83398 30.875C4.82565 30.875 3.96246 30.5405 3.2444 29.8714C2.52635 29.2023 2.16732 28.3979 2.16732 27.4583V5.25H0.333984V1.83333H9.50065V0.125H20.5007V1.83333H29.6673V5.25H27.834V27.4583C27.834 28.3979 27.475 29.2023 26.7569 29.8714C26.0388 30.5405 25.1756 30.875 24.1673 30.875H5.83398ZM24.1673 5.25H5.83398V27.4583H24.1673V5.25ZM9.50065 24.0417H13.1673V8.66667H9.50065V24.0417ZM16.834 24.0417H20.5007V8.66667H16.834V24.0417Z"
      fill={color}
    />
  </svg>
)

const ButtonWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.4rem 0.5rem;
  margin-left: 0.5rem;
  outline: none;
  transition: background-color 0.2s ease; // 배경색의 전환 시간 설정
  &:hover {
    background-color: rgba(0, 0, 0, 0.05); // 호버 시 배경색 조금 더 밝게
  }
  &:active {
    outline: none; // 클릭 시 테두리가 나타나지 않도록 설정
    background-color: rgba(0, 0, 0, 0.1); // 클릭 시 배경색 더 밝게
  }
  &:focus {
    outline: none; // 포커스 시 테두리가 나타나지 않도록 설정
  }
`

const DeleteButton = () => {
  const { setModalOpen } = modalOpenStore()
  const { setPreviewOpen } = previewOpenStore()
  const { setIsDelete } = isDeleteStore()
  const { cardColor } = cardColorStore((state) => ({
    cardColor: state.cardColor,
  }))

  // 삭제 핸들링
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDelete(true)
        setPreviewOpen(false)
        setModalOpen(false)
      }
    })
  }

  return (
    <ButtonWrapper onClick={handleDelete}>
      <DeleteIcon color={cardColor} />
    </ButtonWrapper>
  )
}

export default DeleteButton

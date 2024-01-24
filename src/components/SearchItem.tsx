import styled from 'styled-components'
/*-----------------------------------------------------------*/
// import { searchType } from './SearchList'
import { cardIdStore, modalContentStore, modalOpenStore } from '../store/store'
import Modal from '../components/mydocs/Modal'
/*-----------------------------------------------------------*/

interface searchItemType {
  id: number
  title: string
  created_at: string
  color: string
  keywords?: { name: any }[]
  // keywords: [name: any]
}

interface modalType {
  id: number
  title: string
  created_at: string
  color: string
}

const Container = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  cursor: pointer;
  &:hover {
    width: 50rem;
    background: #f0f0f0;
  }
`
const TItleDateWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`
const Date = styled.div`
  max-width: 30rem;
  font-size: 0.7rem;
  color: #c8c8c8;
  margin-left: 5px;
`
const Title = styled.div`
  max-width: 35rem;
  font-size: 1.2rem;
  font-weight: bold;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 20px;
`
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 35rem;
  margin: 0 20px;
`
const Tag = styled.div`
  color: #eb8698;
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 3px;
`

const SearchItem: React.FC<{ getData: searchItemType[] }> = ({ getData }) => {
  const { setCardId } = cardIdStore((state) => ({ setCardId: state.setCardId }))
  const { modalOpen, setModalOpen } = modalOpenStore() // 모달 활성화
  const { modalContent, setModalContent } = modalContentStore((state) => ({
    modalContent: state.modalContent,
    setModalContent: state.setModalContent,
  }))
  return (
    <>
      {getData.length > 0 &&
        getData.map((item) => (
          <Container
            key={item.id}
            onClick={() => {
              const SearchedModal: modalType = {
                id: item.id,
                title: item.title,
                created_at: item.created_at,
                color: item.color,
              }
              setCardId(item.id) // 수정/삭제 대상 문서 id 설정
              // setModalContent(SearchedModal) // 클릭한 카드의 정보를 ModalContent에 저장
              setModalOpen(true) // 모달 열기
            }}>
            <TItleDateWrapper>
              <Title> {item.title}</Title>
              <Date>{item.created_at.slice(0, 10)}</Date>
            </TItleDateWrapper>
            <TagWrapper>
              {item.keywords!.length > 0 && item.keywords!.map((tag) => <Tag>{tag.name}</Tag>)}
            </TagWrapper>
          </Container>
        ))}
      <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
    </>
  )
}

export default SearchItem

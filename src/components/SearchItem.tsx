import styled from 'styled-components'
/*-----------------------------------------------------------*/
// import { searchType } from './SearchList'
import { cardIdStore, modalContentStore, modalOpenStore, useDarkModeStore } from '../store/store'
import Modal from '../components/mydocs/Modal'
/*-----------------------------------------------------------*/

interface searchItemType {
  id: number
  title: string
  created_at: string
  color: string
  keywords?: { name: any }[]
  // keywords: [name: any]
  repo: string
  tags: string[]
}

interface modalType {
  id: number
  title: string
  created_at: string
  color: string
  repo: string
  tags: string[]
}

const Container = styled.div<{ isDarkMode: boolean }>`
  width: 50rem;
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  cursor: pointer;
  &:hover {
    width: 50rem;
    background: ${(props) => (props.isDarkMode ? '#414141' : '#f0f0f0')};
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
const Title = styled.div<{ isDarkMode: boolean }>`
  max-width: 35rem;
  font-size: 1.2rem;
  font-weight: bold;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 20px;
  color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
`
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 35rem;
  margin: 0 20px;
`
const Tag = styled.div<{ isDarkMode: boolean }>`
  color: #eb8698;
  background-color: ${(props) => (props.isDarkMode ? '#393939' : '#f8f8f8')};
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 3px;
  margin-left: 2px;
  margin-right: 2px;
`

const SearchItem: React.FC<{ getData: searchItemType[] }> = ({ getData }) => {
  const { setCardId } = cardIdStore((state) => ({ setCardId: state.setCardId }))
  const { modalOpen, setModalOpen } = modalOpenStore() // 모달 활성화
  const { modalContent, setModalContent } = modalContentStore((state) => ({
    modalContent: state.modalContent,
    setModalContent: state.setModalContent,
  }))
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)

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
                repo: item.repo,
                tags: item.tags,
              }
              setCardId(item.id) // 수정/삭제 대상 문서 id 설정
              // setModalContent(SearchedModal) // 클릭한 카드의 정보를 ModalContent에 저장
              setModalOpen(true) // 모달 열기
            }}
            isDarkMode={isDarkMode}>
            <TItleDateWrapper>
              <Title isDarkMode={isDarkMode}> {item.title}</Title>
              <Date>{item.created_at.slice(0, 10)}</Date>
            </TItleDateWrapper>
            <TagWrapper>
              {item.keywords!.length > 0 &&
                item.keywords!.map((tag) => <Tag isDarkMode={isDarkMode}>{tag.name}</Tag>)}
            </TagWrapper>
          </Container>
        ))}
      <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
    </>
  )
}

export default SearchItem

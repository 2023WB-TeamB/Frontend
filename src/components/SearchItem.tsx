import styled from 'styled-components'
/*-----------------------------------------------------------*/
import { cardIdStore, modalContentStore, modalOpenStore, useDarkModeStore } from '../store/store'
import Modal from '../components/mydocs/Modal'
/*-----------------------------------------------------------*/

// 인터페이스
interface SearchItemType {
  id: number
  title: string
  created_at: string
  color: string
  repo: string
  tags: string[]
  keywords?: { name: string }[]
}
interface TagType {
  $isDarkMode: boolean
  color: string
}
// 스타일
const Container = styled.div<{ $isDarkMode: boolean }>`
  width: 50rem;
  display: flex;
  flex-direction: column;
  padding: 5px 0;
  cursor: pointer;
  &:hover {
    width: 50rem;
    background: ${(props) => (props.$isDarkMode ? '#414141' : '#f0f0f0')};
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
const Title = styled.div<{ $isDarkMode: boolean }>`
  max-width: 35rem;
  font-size: 1.2rem;
  font-weight: bold;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 20px;
  color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
`
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 35rem;
  margin: 0 20px;
`
const Tag = styled.span<TagType>`
  /* color: #eb8698; */
  color: ${(props) => props.color};
  background-color: ${(props) => (props.$isDarkMode ? '#353535' : '#f8f8f8')};
  font-weight: 500;
  border-radius: 10px;
  padding: 0 10px;
  margin-top: 3px;
  margin-left: 2px;
  margin-right: 2px;
`
// 메인
const SearchItem: React.FC<{ getData: SearchItemType[] }> = ({ getData }) => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { setCardId } = cardIdStore((state) => ({ setCardId: state.setCardId }))
  const { modalOpen, setModalOpen } = modalOpenStore() // Card 모달 상태관리
  const { modalContent, setModalContent } = modalContentStore((state) => ({
    modalContent: state.modalContent,
    setModalContent: state.setModalContent,
  }))

  return (
    <>
      {getData.length > 0 &&
        getData.map((item) => (
          <Container
            key={item.id} // 각 item에 key값 부여
            onClick={() => {
              const SearchedModal = {
                id: item.id,
                title: item.title,
                created_at: item.created_at,
                color: item.color,
                repo: item.repo,
                tags: item.tags,
              }
              setCardId(item.id) // 수정/삭제 대상 문서 id 설정
              setModalContent(SearchedModal) // 클릭한 카드의 정보를 ModalContent에 저장
              setModalOpen(true) // 모달 open
            }}
            $isDarkMode={$isDarkMode}>
            <TItleDateWrapper>
              <Title $isDarkMode={$isDarkMode}> {item.title}</Title>
              <Date>{item.created_at.slice(0, 10)}</Date>
            </TItleDateWrapper>
            <TagWrapper>
              {item.keywords!.length > 0 &&
                item.keywords!.map((tag) => (
                  <Tag key={tag.name} color={item.color} $isDarkMode={$isDarkMode}>
                    {tag.name}
                  </Tag>
                ))}
            </TagWrapper>
          </Container>
        ))}
      <Modal modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} />
    </>
  )
}

export default SearchItem

import styled from 'styled-components'
/*-----------------------------------------------------------*/
import imgSubmit from '../assets/images/search_double_arrow.svg'
import { searchProps } from './Header'

interface searchItemProps {
  searchedData: searchProps[]
}

const Container = styled.div`
  display: flex;
`
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px 0 0 10px;
  width: 18rem;
  padding: 5px 0;
  margin-bottom: 10px;
`
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 0 10px 10px 0;
  width: auto;
  padding: 5px 0;
  margin-bottom: 10px;
`
const Date = styled.div`
  max-width: 18rem;
  font-size: 0.9rem;
  margin: 0 10px;
`
const Title = styled.div`
  max-width: 18rem;
  font-size: 1rem;
  font-weight: bold;
  word-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 0 10px;
`
const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 18rem;
  margin: 0 10px;
`
const Tag = styled.div`
  color: white;
  background-color: #8cccfb;
  border-radius: 5px;
  padding: 2px;
  margin: 3px 3px;
`
const Submit = styled.img`
  width: 80px;
  height: 80px;
`
const SearchItem: React.FC<searchItemProps> = ({ searchedData }) => {
  // const onClick = () => {}
  return (
    <>
      {searchedData.map((item) => (
        <Container>
          <LeftContainer>
            <Date>{item.updated_at.slice(0, 10)}</Date>
            <Title> {item.title}</Title>
            <TagWrapper>
              {item.keywords.length > 0 && item.keywords.map((tag) => <Tag>{tag.name}</Tag>)}
            </TagWrapper>
          </LeftContainer>
          <RightContainer>
            {/* Submit 이미지 및 기타 내용 */}
            <Submit src={imgSubmit} />
          </RightContainer>
        </Container>
      ))}
    </>
  )
}

export default SearchItem

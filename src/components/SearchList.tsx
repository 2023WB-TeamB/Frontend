import React from 'react'
import styled from 'styled-components'
/*-----------------------------------------------------------*/
// import { SearchData } from './types'
import SearchItem from './SearchItem'
import { searchProps } from './Header'

interface searchListProps {
  searchedData: searchProps[]
}

/**** 스타일 ****/

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* position: relative; */

  background-color: #f5f5f5;
  border-radius: 0px;
  color: black;

  height: 450px;
  width: 400px;
  overflow-y: auto;
  /* margin-top: 20px; */
  padding: 10px 0;
  z-index: 1;
`

const SearchList: React.FC<searchListProps> = ({ searchedData }) => {
  console.log(searchedData)
  return (
    <Container>
      <SearchItem searchedData={searchedData} />
    </Container>
  )
}

export default SearchList

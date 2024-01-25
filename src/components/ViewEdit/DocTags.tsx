import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useDocTagStore, useEditorModeStore, useDarkModeStore } from '../../store/store'

interface TagStyleProps {
  isDarkMode: boolean
}
const TagStyle = css<TagStyleProps>`
  margin: 5px 5px 15px 5px;
  padding: 2px 10px;
  border-radius: 17px;
  background-color: ${(props) => (props.isDarkMode ? '#2A2A2A' : '#F8F8F8')};
  color: #eb8698;
  font-size: 15px;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1.5rem;
`
const TagLabel = styled.label<TagStyleProps>`
  ${TagStyle}
`
const TagButton = styled.button<TagStyleProps>`
  ${TagStyle}
`
const TagWrapper = styled.div<TagStyleProps>`
  position: relative;
  width: 100%;
  height: 45px;
  background-color: transparent;
  display: flex;
  flex-direction: row;

  & input {
    width: 10%;
    margin: 5px 5px 15px 5px;
    padding: 2px 10px;
    background: transparent;
    border: none;
    border-radius: 18px;
    font-size: 15px;
    font-family: 'Inter';
    font-weight: 400;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  }
`

const DocTags: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { tags, addTag, removeTag } = useDocTagStore()
  const { isEditor } = useEditorModeStore()
  const [inputTag, setInputTag] = useState('')

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputTag('')
      addTag(inputTag)
    }
  }

  return (
    <TagWrapper isDarkMode={isDarkMode}>
      {tags.map((tag, index) =>
        isEditor ? (
          <TagButton onClick={() => removeTag(index)} isDarkMode={isDarkMode}>
            {tag}
          </TagButton>
        ) : (
          <TagLabel isDarkMode={isDarkMode}>{tag}</TagLabel>
        ),
      )}
      {isEditor && (
        <input
          value={inputTag}
          defaultValue={inputTag}
          placeholder="Input Tag"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputTag(event.target.value)
          }}
          onKeyDown={handleAddTag}
        />
      )}
    </TagWrapper>
  )
}

export default DocTags

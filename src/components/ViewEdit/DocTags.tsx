import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useDocTagStore, useEditorModeStore, useDarkModeStore, useDocContentStore } from '../../store/store'

interface TagStyleProps {
  isDarkMode: boolean
  color: string | undefined
}
const TagStyle = css<TagStyleProps>`
  margin: 5px 5px 15px 5px;
  padding: 2px 10px;
  border-radius: 17px;
  background-color: ${(props) => (props.isDarkMode ? '#2A2A2A' : '#F8F8F8')};
  color: ${(props) => props.color};
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.2rem;
  transition: ease .3s;
`
const TagLabel = styled.label<TagStyleProps>`
  ${TagStyle}
  
`
const TagButton = styled.button<TagStyleProps>`
  ${TagStyle}
`
const TagWrapper = styled.div<{ isDarkMode: boolean }>`
  position: relative;
  width: 100%;
  height: 45px;
  background-color: transparent;
  display: flex;
  flex-direction: row;

  & input {
    width: 30rem;
    margin: 5px 5px 15px 5px;
    padding: 2px 10px;
    background: transparent;
    border: none;
    border-radius: 18px;
    font-size: 15px;
    font-weight: 400;
    color: ${(props) => (props.isDarkMode ? 'white' : 'black')};
  }
`

const DocTags: React.FC = () => {
  const isDarkMode = useDarkModeStore((state) => state.isDarkMode)
  const { tags, addTag, removeTag } = useDocTagStore()
  const { color } = useDocContentStore()
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
          <TagButton 
            onClick={() => removeTag(index)} 
            isDarkMode={isDarkMode}
            color={color}
          >
            {tag}
          </TagButton>
        ) : (
          <TagLabel isDarkMode={isDarkMode} color={color}>
            {tag}
          </TagLabel>
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

import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import {
  useDocTagStore,
  useEditorModeStore,
  useDarkModeStore,
  useDocContentStore,
} from '../../store/store'

interface TagStyleProps {
  $isDarkMode: boolean
  color: string | undefined
}
const TagStyle = css<TagStyleProps>`
  display: inline-block;
  max-width: 100%;
  margin: 3px 3px;
  border-radius: 17px;
  background-color: ${(props) => (props.$isDarkMode ? '#2A2A2A' : '#F8F8F8')};
  color: ${(props) => props.color};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-block: 6px;
  padding-inline: 12px;
  transition: ease 0.3s;
  border-block-end: 1px solid;
`
const TagButton = styled.button<TagStyleProps>`
  ${TagStyle}
`
const TagWrapper = styled.div<{ $isDarkMode: boolean }>`
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin-bottom: 5px;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: horizontal;
  text-overflow: ellipsis;

  & input {
    position: sticky;
    left: 0;
    bottom: -2.2rem;
    width: auto;
    height: 1.7rem;
    padding: 2px 10px;
    background: transparent;
    border: none;
    border-radius: 18px;
    font-size: 15px;
    font-weight: 400;
    color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
  }
`

const DocTags: React.FC = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
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
    <TagWrapper $isDarkMode={$isDarkMode}>
      {tags.map((tag, index) =>
        isEditor ? (
          <TagButton onClick={() => removeTag(index)} $isDarkMode={$isDarkMode} color={color}>
            {tag}
          </TagButton>
        ) : (
          <TagButton $isDarkMode={$isDarkMode} color={color}>
            {tag}
          </TagButton>
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

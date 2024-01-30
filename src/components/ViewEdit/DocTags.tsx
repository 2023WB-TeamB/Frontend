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
  margin: 0px 3px 8px;
  border-radius: 17px;
  background-color: ${(props) => (props.$isDarkMode ? '#282828' : '#F8F8F8')};
  color: ${(props) => props.color};
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1rem;
  border: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-block: 6px;
  padding-inline: 12px;
  transition: ease .3s;
  /* border-block-end: 1px solid #eee;
  border-inline-end: 1px solid #eee; */
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
  margin-top: 1rem;
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

const TagGuideContent = styled.div<{ $isDarkMode: boolean }>`
  position: absolute;
  width: 20rem;
  height: 4rem;
  background: ${(props) => props.$isDarkMode ? '#222' : '#fff'};;
  outline: 1px solid ${(props) => props.$isDarkMode ? '#555' : '#ccc'};
  border-radius: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 10;
  font-size: .7rem;
`

const DocTags: React.FC = () => {
  const $isDarkMode = useDarkModeStore((state) => state.$isDarkMode)
  const { tags, addTag, removeTag } = useDocTagStore()
  const { color } = useDocContentStore()
  const { isEditor } = useEditorModeStore()
  const [inputTag, setInputTag] = useState('')
  const [isOpenTagGuide, setIsOpenTagGuide] = useState(false)

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputTag('')
      addTag(inputTag)
    }
    if (isOpenTagGuide)
      setIsOpenTagGuide(false)
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
      {isEditor &&
        <input
          value={inputTag}
          defaultValue={inputTag}
          placeholder="Input Tag"
          maxLength={16}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputTag(event.target.value)
          }}
          onKeyDown={handleKeydown}
          onFocus={() => setIsOpenTagGuide(true)}
          onBlur={() => setIsOpenTagGuide(false)}
        />
      }
      {isOpenTagGuide && 
        <TagGuideContent $isDarkMode={$isDarkMode}>
          <p>
            Enter the tag and press Enter to create it.
            <br/>
            And click on the created tag and it will be deleted.
          </p>
        </TagGuideContent>
      }
    </TagWrapper>
  )
}

export default DocTags

import React, { useState } from "react"
import styled, { css } from "styled-components"
import { useViewerModeStore } from "../../store/store"

const TagStyle = css`
  margin: 5px;
  padding: 0 10px;
  border: 2px solid red;
  border-radius: 30px;
  background: transparent;
  color: black;
`
const TagLabel = styled.label`
  ${TagStyle}
`
const TagButton = styled.button`
  ${TagStyle}
`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
const TagWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    background-color: transparent;
    display: flex;
    flex-direction: row;

    & input {
        margin: 5px;
        background: transparent;
        border: none;
        border-radius: 30px;
        color: black;
    }
`

const DocTags: React.FC = () => {
    // ! 임시 태그
    const [tags, setTag] = useState<string[]>(['React', 'TypeScript', 'Styled-Component'])
    const {isViewer} = useViewerModeStore()
    const [inputTag, setInputTag] = useState("");

    const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setInputTag("")
            const newTags = [...tags, inputTag]
            setTag(newTags)
        }
    }
    const removeTag = (index: number) => {
        const newTags = [...tags]
        newTags.splice(index, 1)
        setTag(newTags)
    }
    return (
        <TagWrapper>
            {tags.map((tag, index) => (
                isViewer ?
                    <TagLabel>{tag}</TagLabel> 
                    :
                    <TagButton onClick={() => removeTag(index)}>{tag}</TagButton>
            ))}
            {isViewer ? null : 
                <input
                    value={inputTag}
                    defaultValue={inputTag}
                    placeholder='Input Tag' 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInputTag(event.target.value)
                    }}
                    onKeyDown={addTag}/>}
        </TagWrapper>
    )
}

export default DocTags
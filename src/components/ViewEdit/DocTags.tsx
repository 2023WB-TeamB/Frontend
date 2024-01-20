import React, { useState } from "react"
import styled, { css } from "styled-components"
import { useDocTagStore, useViewerModeStore } from "../../store/store"

const TagStyle = css`
  margin: 5px;
  padding: 0 10px;
  border: 2px solid lightseagreen;
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
    const {tags, addTag, removeTag} = useDocTagStore()
    const {isViewer} = useViewerModeStore()
    const [inputTag, setInputTag] = useState("");

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setInputTag("")
            addTag(inputTag)
        }
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
                    onKeyDown={handleAddTag}/>}
        </TagWrapper>
    )
}

export default DocTags
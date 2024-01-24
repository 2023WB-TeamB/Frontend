import React, { useState } from "react"
import styled, { css } from "styled-components"
import { useDocTagStore, useEditorModeStore } from "../../store/store"

const TagStyle = css`
  margin: 5px;
  padding: 2px 10px;
  border: 1px solid lightseagreen;
  border-radius: 20px;
  background: transparent;
  color: black;
  line-height: 1.5rem;
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
    const {isEditor} = useEditorModeStore()
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
                isEditor ?
                    <TagButton onClick={() => removeTag(index)}>{tag}</TagButton>
                    :
                    <TagLabel>{tag}</TagLabel> 
            ))}
            {isEditor && 
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
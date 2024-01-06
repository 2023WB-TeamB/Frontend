import React from "react";
import styled from "styled-components";
import pdfIcon from "../assets/images/pdf.png"
import cloudIcon from "../assets/images/upload-cloud.png"
import urlIcon from "../assets/images/url.png"
import qrCreateIcon from "../assets/images/qr-code-add.png"
import closeIcon from "../assets/images/closeIcon.png"
import OptionButton from "./OptionButton";
import BackDrop from "./BackDrop";

const ModalWrapper = styled.div`
    position: fixed;
    top: 20vh;
    left: 30vw;
    width: 400px;
    height: 500px;
    background-color: rgba(243, 243, 243);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 10000;

    & label {
        margin: 35px;
        height: 60px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 2.4em;
        font-style: italic;
        font-weight: bold;
    }
`;

const OptionsWrapper = styled.div`
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CloseButton = styled.button`
    margin: 20px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`;

interface ModalOptionsProps {
    isOpenOptions: boolean;
    onClose?: (event:React.MouseEvent<HTMLButtonElement>) => void;
}

const ModalOptions: React.FC<ModalOptionsProps> = ({ isOpenOptions, onClose }) => {
    return (
        <>
            {isOpenOptions && (
                <>
                    <BackDrop/>
                    <ModalWrapper>
                    <CloseButton onClick={onClose}>
                        <img src={closeIcon}></img>
                    </CloseButton>
                    <label>Export</label>
                    <OptionsWrapper>
                        <OptionButton icon={pdfIcon} context="Download as PDF"/>
                        <OptionButton icon={cloudIcon} context="Upload to Cloud"/>
                        <OptionButton icon={urlIcon} context="Copy a URL"/>
                        <OptionButton icon={qrCreateIcon} context="Make a QR code"/>
                    </OptionsWrapper>
                    </ModalWrapper>
                </>
            )}
        </>
    );
}

export default ModalOptions;
import React from "react";
import styled from "styled-components";
import pdfIcon from "../../assets/images/pdf.png"
import cloudIcon from "../../assets/images/upload-cloud.png"
import urlIcon from "../../assets/images/url.png"
import qrCreateIcon from "../../assets/images/qr-code-add.png"
import closeIcon from "../../assets/images/closeIcon.png"
import OptionButton from "./OptionButton";
import BackDrop from "./BackDrop";
import axios from 'axios';
import Swal from 'sweetalert2'

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 400px;
    height: 500px;
    background-color: rgba(243, 243, 243);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 1000;

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
    const apiUrl = 'http://gtd.kro.kr:8000/api/v1/docs/'
    
    // ! docsId : 임시 문서ID 
    const docsId = 4;
    
    // * Toast 알림창
    const ToastInfor = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 1800,
    });
    
    // * URL 할당 -> docUrl
    let docUrl = ""
    const handleUrlShare = async () => {
        try {
            // API 호출, 액세스 토큰
            const access = localStorage.getItem('accessToken')
            const response = await axios.post(`${apiUrl}share/`, {
                docs_id: docsId
                }, {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            })
            docUrl = response.data.share_url
        } catch (error:any) {
            // API 호출 실패
            if (error.response.status === 409)
                docUrl = error.response.data.existing_url
            console.error("API Error :", error)
        }
    }

    // * URL 클립보드로 복사
    const handleCopyClipBoardURL = async () => {
        try {
            await handleUrlShare()
            await navigator.clipboard.writeText(docUrl);
            ToastInfor.fire({
                icon: "success",
                title: "URL이 복사되었습니다!"
            });
        } catch (err) {
            ToastInfor.fire({
                icon: "error",
                title: "URL 복사 실패"
            });
        }
    };    

    // * QR 로딩창
    const showQRCode = async () => {
        if (docUrl === "") {
          Swal.fire({
            title: 'Loading...',
            allowOutsideClick: false,
            didOpen: async () => {
                try {
                    await handleUrlShare()
                    setTimeout(() => {
                        Swal.close();
                        showQRCodeModal();
                    }, 1000)
                } catch (error) {
                    console.log(error)
                }
            }
          });
        } else {    
          showQRCodeModal();
        }
    };
    // * QR 조회창
    const showQRCodeModal = () => {
        console.log(docUrl)
        Swal.fire({
            // ! 문서 제목으로 수정 예정
            title: "문서 제목; docs_id : " + docsId,
            text: docUrl,
            imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${docUrl}`,
            imageAlt: 'QR Code',
            showConfirmButton: true
        });
    };
    
    return (
        <>
            {isOpenOptions && (
                <>
                    <BackDrop/>
                    <ModalWrapper>
                    <CloseButton onClick={onClose}>
                        <img src={closeIcon} alt="Close"/>
                    </CloseButton>
                    <label>Export</label>
                    <OptionsWrapper>
                        <OptionButton icon={pdfIcon} context="Download as PDF"/>
                        <OptionButton icon={cloudIcon} context="Upload to Cloud"/>
                        <OptionButton icon={urlIcon} context="Copy a URL" onClick={handleCopyClipBoardURL}/>
                        <OptionButton icon={qrCreateIcon} context="Make a QR code" onClick={showQRCode}/>
                    </OptionsWrapper>
                    </ModalWrapper>
                </>
            )}
        </>
    );
}

export default ModalOptions;
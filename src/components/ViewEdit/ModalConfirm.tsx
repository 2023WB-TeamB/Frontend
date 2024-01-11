import React from "react";
import styled from "styled-components";
import ConfirmButton from "./ConfirmButton";
import ConfirmIcon from "../../assets/images/confirm.png";
import BackDrop from "./BackDrop";

const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    width: 500px;
    height: 250px;
    background-color: rgba(243, 243, 243);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    z-index: 1000;
    transition: all ease-in-out .5s;
`;

const ContextWrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & img {
        width: 60px;
        height: 60px;
    }

    & label {
        margin: 15px;
        max-width: 250px;
        height: 50px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        display: flex;
        align-items: center;
    }
`;

const ButtonWrapper = styled.div`
    width: 65%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

/* 
// 닫기 버튼이 필요한가??
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
*/

interface ModalConfirmProps {
    icon?: string;
    label?: string;
    confirmOption?: Array<[option: string, 
        onClick?: (event:React.MouseEvent<HTMLButtonElement>) => void]>;
    isOpenConfirm: boolean;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isOpenConfirm, icon, label, confirmOption }) => {
    return (
        <>
            {isOpenConfirm && (
                <>
                    <BackDrop />
                    <ModalWrapper>
                        <ContextWrapper>
                            <img src={icon || ConfirmIcon}></img>
                            <label>{label}</label>
                        </ContextWrapper>
                        <ButtonWrapper>
                            {confirmOption && confirmOption.map((item) => {
                                const [option, onClick] = item;
                                return <ConfirmButton context={option} onClick={onClick}/>
                            })}
                        </ButtonWrapper>
                    </ModalWrapper>
                </>
            )}
        </>
    );
}

export default ModalConfirm;
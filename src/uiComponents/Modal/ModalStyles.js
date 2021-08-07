import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

export const ContainerModal = styled.div`
  position: fixed;
  background: white;
  width: 730px;
  height: 361px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: fixed;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

export const TitleModal = styled.h1`
  color: #662e9b;
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
`;

export const SubtitleModal = styled.h2`
  color: #323941;
  font-size: 14px;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const ResetPassword = styled.a`
  color: #ff3b53;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const FormModal = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const LabelModal = styled.label`
  color: #323941;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

export const FormInput = styled.input`
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  outline: none;
  width: 300px;
  margin-bottom: 20px;
  margin-top: 10px;
  border: none;
  font-size: 14px;
  border: 1px solid #0E172C;

  &::placeholder {
    color: #242424;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;

export const FormTextArea = styled.textarea`
  padding: 10px 20px;
  border-radius: 2px;
  margin-right: 10px;
  outline: none;
  border: none;
  width: 300px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #fff;

  &::placeholder {
    color: #242424;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 0 0 16px 0;
  }
`;


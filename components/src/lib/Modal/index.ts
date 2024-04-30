import Title from '../components/Title/Title';
import Button from '../components/Button/Button';
import ModalCloseButton from '../components/CloseButton/CloseButton';
import { ModalBody, ModalFooter, ModalHeader, ModalMain } from './Modal';

export const Modal = Object.assign(ModalMain, {
  Title: Title,
  Button: Button,
  CloseButton: ModalCloseButton,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});

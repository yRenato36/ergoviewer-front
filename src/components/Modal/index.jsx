import { ModalContent, ModalWrapper } from "./styles";

export const Modal = ({ isOpen, onClose, children, onSubmit }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {children}
        <button onClick={onClose}>Fechar</button>
      </ModalContent>
    </ModalWrapper>
  );
};

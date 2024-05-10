import {
  ModalAnalysis,
  ModalAnalysisContent,
  ModalContent,
  ModalWrapper,
} from "./styles";

export const Modal = ({ isOpen, onClose, children, onSubmit, isAnalysis }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return isAnalysis ? (
    <ModalAnalysis onClick={onClose}>
      <ModalAnalysisContent
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {children}
        <button onClick={onClose}>Fechar</button>
      </ModalAnalysisContent>
    </ModalAnalysis>
  ) : (
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

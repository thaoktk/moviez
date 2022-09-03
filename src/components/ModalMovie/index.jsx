import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function ModalMovie({
  isOpen,
  onClose,
  children,
  hasSecondBtn,
  onClickSecondBtn,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="!bg-gray-800">
          <ModalHeader className="text-white">Trailer</ModalHeader>
          <ModalCloseButton className="text-white" />
          <ModalBody className="min-w-full">{children}</ModalBody>
          <ModalFooter>
            <button
              onClick={onClose}
              className="mr-4 px-8 py-2 bg-red text-white rounded-full hover:bg-red/80 transition-all"
            >
              Close
            </button>
            {hasSecondBtn && (
              <button
                onClick={onClickSecondBtn}
                className="px-8 py-2 text-white rounded-full hover:bg-black/40 transition-all"
              >
                Yes
              </button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalMovie;

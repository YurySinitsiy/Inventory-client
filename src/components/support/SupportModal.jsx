import Modal from '../tools/Modal';
import SupportForm from '../form/SupportForm';
const SupportModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
    <SupportForm/>
  </Modal>
  )
};

export default SupportModal;

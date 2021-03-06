import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import dynamic from "next/dynamic";
import Newsletter from "../newsletter";
import AppointmentForm from "../form/appointment-form";

const ProductPopup = dynamic(() => import("@components/product/product-popup"));
const ManagedModal: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();
  return (
    <Modal open={displayModal} onClose={closeModal}>
      {modalView === "BOOKING_VIEW" && <AppointmentForm />}
      {/*modalView === "SIGN_UP_VIEW" && <SignUpForm />}
  {modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}*/}

      {modalView === "PRODUCT_VIEW" && <ProductPopup />}
      {modalView === "NEWSLETTER_VIEW" && <Newsletter />}
    </Modal>
  );
};

export default ManagedModal;

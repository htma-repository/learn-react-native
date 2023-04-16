import { Modal, StyleSheet } from "react-native";

type ModalViewProps = {
  children: React.ReactNode;
  isModalShow: boolean;
};

const ModalView = ({ children, isModalShow }: ModalViewProps) => {
  return (
    <Modal visible={isModalShow} animationType="slide">
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ModalView;

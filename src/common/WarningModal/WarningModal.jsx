import { Button, Modal } from "antd";

export const WarningModal = ({ open, onCancel, onConfirm, modalText }) => {
  return (
    <Modal
      title={`Потвердите ${modalText.title}`}
      centered
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="ok" danger type="primary" onClick={onConfirm}>
          {modalText.btn}
        </Button>,
      ]}
      okButtonProps={{ danger: true }}
    >
      <p>Вы уверены, что хотите {modalText.text}?</p>
    </Modal>
  );
};

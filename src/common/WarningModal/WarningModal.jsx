import { Modal } from "antd";

export const WarningModal = ({ open, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Подтвердите удаление"
      centered
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Удалить"
      cancelText="Отмена"
      okButtonProps={{ danger: true }}
    >
      <p>Вы уверены, что хотите завершить процесс все данные будут удалены?</p>
    </Modal>
  );
};

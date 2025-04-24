import { Button, Modal } from "antd";

export const InWorkModal = ({ open, onCansel, docId }) => {
  console.log(docId);

  return (
    <Modal
      centered
      width={400}
      open={open}
      title="Предупреждение"
      onCancel={onCansel}
      footer={[
        <Button key="submit" type="primary" onClick={onCansel}>
          Отправить в работу
        </Button>,
      ]}
    >
      <p>Документ будет отправлен в работу. Вы уверены?</p>
    </Modal>
  );
};

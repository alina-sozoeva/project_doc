import { Button, Flex, Input, Modal, Typography } from "antd";

export const ApprovalModal = ({ open, onCancel, item }) => {
  return (
    <>
      <Modal centered width={400} open={open} onCancel={onCancel} footer={null}>
        <Flex vertical>
          <Typography.Title level={4}>Утвердить документ</Typography.Title>
          <Input.TextArea rows={3} placeholder="Введите комментарии" />
        </Flex>
        <Flex align="center" justify="center" gap={"small"}>
          <Button type="primary">Согласовать</Button>
          <Button danger>Отказать</Button>
          <Button type="default">Доработать</Button>
        </Flex>
      </Modal>
    </>
  );
};

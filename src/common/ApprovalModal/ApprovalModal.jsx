import { Button, Flex, Input, Modal, Typography } from "antd";

export const ApprovalModal = ({
  open,
  onCancel,
  item,
  onConfirm,
  onRegec,
  onRevis,
}) => {
  return (
    <>
      <Modal centered width={400} open={open} onCancel={onCancel} footer={null}>
        <Flex vertical gap={"small"}>
          <Flex vertical>
            <Typography.Title level={4}>Утвердить документ</Typography.Title>
            <Input.TextArea rows={3} placeholder="Введите комментарии" />
          </Flex>
          <Flex align="center" justify="center" gap={"small"}>
            <Button type="primary" onClick={onConfirm}>
              Согласовать
            </Button>
            <Button danger onClick={onRegec}>
              Отказать
            </Button>
            <Button onClick={onRevis} type="default">
              Доработать
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

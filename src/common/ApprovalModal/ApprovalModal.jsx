import { Button, Flex, Input, Modal, Typography } from "antd";
import { EditForm } from "../../components";

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
      <Modal centered width={800} open={open} onCancel={onCancel} footer={null}>
        <Flex vertical gap={"small"}>
          <Flex vertical>
            <Typography.Title level={4}>Утвердить документ</Typography.Title>
            <EditForm item={item} />
            <label>Комментарий:</label>
            <Input.TextArea rows={3} placeholder="Введите комментарии" />
          </Flex>
          <Flex align="center" justify="space-between" gap={"small"}>
            <Flex gap={"small"}>
              <Button type="primary" onClick={onConfirm}>
                Согласовать
              </Button>
              <Button onClick={onRevis} type="default">
                Доработать
              </Button>
            </Flex>
            <Button danger onClick={onRegec}>
              Отказать
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

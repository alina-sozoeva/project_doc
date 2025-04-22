import { Button, message, Upload } from "antd";
import styles from "./DocUploaded.module.scss";

export const DocUploaded = ({ value = [], onChange }) => {
  const blockExtensions = [
    ".exe",
    ".bat",
    ".cmd",
    ".sh",
    ".js",
    ".msi",
    ".vbs",
  ];

  const isSafeExtension = (file) => {
    const name = file.name.toLowerCase();
    const result = !blockExtensions.some((ext) => name.endsWith(ext));
    return result;
  };

  const handleChange = ({ fileList }) => {
    onChange?.(fileList);
  };

  const customBeforeUpload = (file) => {
    if (!isSafeExtension(file)) {
      message.error(`${file.name} — не верный формат.`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const props = {
    multiple: true,
    beforeUpload: customBeforeUpload,
    showUploadList: true,
    fileList: value,
    onChange: handleChange,
  };

  return (
    <Upload {...props} className={styles.uploadArea}>
      <Button>Загрузить документы</Button>
    </Upload>
  );
};

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
    return !blockExtensions.some((ext) => name.endsWith(ext));
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
    <Upload
      {...props}
      itemRender={(file, actions) => (
        <span className={styles.customUploadItem}>
          <span>{file.name}</span>
          <p onClick={() => actions.remove?.()}>X</p>
        </span>
      )}
      className={styles.uploadArea}
    >
      <Button>Загрузить документы</Button>
    </Upload>
  );
};

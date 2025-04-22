import { uploaded } from "@/shared/api/endpoints/documentsApi"; // или откуда у тебя там uploaded

export const uploadFiles = async (fieldName, files) => {
  const uploadedFileUrls = [];

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append(fieldName, file.originFileObj);

      const uploadResponse = await uploaded(formData).unwrap();
      uploadedFileUrls.push(uploadResponse.filesInfo[0].name);
    }

    return uploadedFileUrls;
  } catch (err) {
    console.error("Ошибка при загрузке файлов", err);
    throw err;
  }
};

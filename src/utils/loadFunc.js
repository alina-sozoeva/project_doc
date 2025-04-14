export const getStorageData = (key, defultObj) => {
  try {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
    return defultObj !== undefined ? [defultObj] : [];
  } catch (error) {
    console.error(`Ошибка при загрузке данных из localStorage: ${error}`);
    return [];
  }
};

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Ошибка при сохранении данных в localStorage: ${error}`);
  }
};

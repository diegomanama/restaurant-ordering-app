export const requestLanguageData = async (propertyKey) => {
  const json = await fetch(
    `${document.URL}/text-content/${navigator.language.slice(0, 2)}.json`
  );
  const data = await json.json();

  if (typeof propertyKey === "undefined") {
    return data;
  }
  return data[propertyKey];
};

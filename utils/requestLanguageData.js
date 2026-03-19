export const requestLanguageData = async (propertyKey) => {
  const urlObject = new URL(document.URL);
  const urlWithoutQueries = urlObject.origin + urlObject.pathname;

  const json = await fetch(
    `${urlWithoutQueries}/text-content/${navigator.language.slice(0, 2)}.json`
  );
  const data = await json.json();

  if (typeof propertyKey === "undefined") {
    return data;
  }
  return data[propertyKey];
};

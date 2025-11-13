export const addEventListenerAll = (
  elementCollection,
  eventType,
  handler,
  options
) => {
  for (const element of elementCollection) {
    element.addEventListener(eventType, handler, options);
  }
};

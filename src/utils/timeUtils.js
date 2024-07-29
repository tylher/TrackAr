export const convertTimeStampToLocalDate = (timestamp) => {
  const date = new Date(timestamp);

  return date.toLocaleString();
};

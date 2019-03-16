export default response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  if (response.status === 204) {
    return;
  }
  return response.json();
};

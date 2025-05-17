export const getRoles = () => {
  const {
    payload: { roles },
  } = JSON.parse(localStorage.getItem(`${window.location.origin}_tokenUL`) || '');

  return roles;
};

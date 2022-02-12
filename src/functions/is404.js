export const is404 = async (href) => {
  const request = await fetch(href, {
    method: 'HEAD',
  });
  if (request.status === 404) {
    return true;
  }
  return false;
};

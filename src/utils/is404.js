export const is404 = async (href) => {
  const request = await fetch(href, {
    hethod: 'HEAD',
  });
  if (request.status === 404) {
    return true;
  }
  return false;
};

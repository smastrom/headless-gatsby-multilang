const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const formatDateTime = (dateString, contextLocale) =>
  new Date(dateString).toLocaleString(contextLocale, {
    ...dateOptions,
    ...timeOptions,
  });

const formatDate = (dateString, contextLocale) =>
  new Date(dateString).toLocaleString(contextLocale, {
    ...dateOptions,
  });

export { formatDateTime, formatDate };

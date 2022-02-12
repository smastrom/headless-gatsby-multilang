const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const formatDateTime = (dateString, contextLocale) =>
  new Date(dateString).toLocaleString(contextLocale, {
    ...dateOptions,
    ...timeOptions,
  });

export const formatDate = (dateString, contextLocale) =>
  new Date(dateString).toLocaleString(contextLocale, {
    ...dateOptions,
  });

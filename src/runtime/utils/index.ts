export function middleTruncate(
  text: string,
  { leftLimit = 100, rightLimit = 10, ellipsis = '[...]' } = {}
) {
  if (String(text).length <= leftLimit + rightLimit) {
    return text;
  }

  return [text.slice(0, leftLimit), ellipsis, text.slice(-rightLimit)].join('');
}

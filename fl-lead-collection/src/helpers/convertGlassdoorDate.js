function getMillis(unit) {
  switch (unit) {
    case 's':
      return 1000;
    case 'm':
      return 60000;
    case 'h':
      return 3600000;
    case 'd':
      return 86400000;
    case 'w':
      return 604800000;
    case 'mo':
      return 2592000000;
    case 'y':
      return 31536000000;
    default:
      return 0;
  }
}

export function convertGlassdoorDate(originalDate) {
  const time = originalDate.match(/(\d+)\s*([a-z]+)/i);
  let datePosted = originalDate;
  if (time) {
    const diff = parseInt(time[1], 10);
    const unit = time[2].toLowerCase();
    const now = new Date();
    const postDate = new Date(now.getTime() - diff * getMillis(unit));
    datePosted = postDate.toDateString();
  }
  return datePosted;
}

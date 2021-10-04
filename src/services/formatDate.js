export function formatDate(time) {
  return time > 9 ? time : `0${time}`;
}

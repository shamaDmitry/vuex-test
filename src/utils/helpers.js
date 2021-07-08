export default function formatDate(date) {
  //date format "2021-07-08T10:51:42.261Z"

  return date.replaceAll('-', '').slice(0, 8)
}
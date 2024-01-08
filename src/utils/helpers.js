export default function formatDate(date) {
  //date format "2021-07-08T10:51:42.261Z"
  //return 20210708
  return date.replaceAll('-', '').slice(0, 8)
}
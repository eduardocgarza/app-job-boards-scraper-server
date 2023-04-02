export default function convertToAirtableDate(inputDate: string) {
  const date = new Date(inputDate);
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

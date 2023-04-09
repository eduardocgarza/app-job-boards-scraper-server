export default function convertToAirtableDate(inputDate: string) {
  console.log("~~~~ convertToAirtableDate Input: ~~~~", inputDate);
  const date = new Date(inputDate);
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript
  const day = date.getDate();
  const year = date.getFullYear();
  const airtableDate = `${month}/${day}/${year}`;
  console.log("~~~~ convertToAirtableDate - Date: ~~~~", airtableDate, "\n\n\n");
  return airtableDate;
}

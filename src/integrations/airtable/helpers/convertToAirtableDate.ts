function isValidDate(airtableDate: string) {
  const pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = airtableDate.match(pattern);
  if (!match) {
    return false;
  }
  const [_, monthStr, dayStr, yearStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.getFullYear() == year && dateObj.getMonth() + 1 == month && dateObj.getDate() == day;
}

export default function convertToAirtableDate(inputDate: string): string {
  console.log("~~~~ convertToAirtableDate Input: ~~~~", inputDate);
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    console.log("~~~~ convertToAirtableDate - Invalid Date: ~~~~", inputDate, "\n\n\n");
    return "";
  }
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript
  const day = date.getDate();
  const year = date.getFullYear();
  const airtableDate = `${month}/${day}/${year}`;
  console.log("~~~~ convertToAirtableDate - Date: ~~~~", airtableDate, "\n\n\n");
  return isValidDate(airtableDate) ? airtableDate : "";
}

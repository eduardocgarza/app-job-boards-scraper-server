var INITIAL_LIST = ".SerpJob";

var items = [...document.querySelectorAll(INITIAL_LIST)];

function setupText(dom) {
  return function getText(query) {
    var item = dom.querySelector(query);
    item = item ? item.textContent : "";
    item = item.trim();
    return item;
  };
}

function convertToNum(text) {
  var format = text;
  format = format.replace("K", "000");
  format = format.replace("M", "000000");
  return Number(format).toLocaleString();
}

var formattedItems = items.map(item => {
  var getText = setupText(item);
  var roleName, rolePage, companyName, location, description, salaryRange, datePosted;

  roleName = getText(".SerpJob-titleLink");
  rolePage = item.querySelector(".SerpJob-titleLink");
  rolePage = rolePage ? rolePage.href : "";

  companyName = getText(".SerpJob-company");
  location = getText(".SerpJob-location");
  location = location ? location.replace("—", "") : "";
  location = location.trim();

  description = getText(".SerpJob-snippet");
  salaryRange = getText(".Estimated_Salary");
  salaryRange = salaryRange.replace("Estimated: ", "");
  salaryRange = salaryRange.replace("\n", "");
  salaryRange = salaryRange.replace("-                 ", "- ");
  salaryRange = salaryRange.trim();

  datePosted = getText(".SerpJob-age");

  return { roleName, rolePage, companyName, location, description, salaryRange, datePosted };
});

copy(formattedItems);
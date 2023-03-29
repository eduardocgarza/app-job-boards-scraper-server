var INITIAL_LIST = ".css-errlgf";

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

  var companyName, companyRating, reviews, salaries, jobs, location, companySize, industry, description, profileLink;

  companyName = getText(".align-items-center h2");

  companyRating = getText(".align-items-center h2 + div");
  companyRating = companyRating.replace("★", "");

  reviews = getText("[data-test='cell-Reviews-count']");
  salaries = getText("[data-test='cell-Salaries-count']");
  jobs = getText("[data-test='cell-Jobs-count']");

  location = getText("[data-test='employer-location']");
  companySize = getText("[data-test='employer-size']");
  industry = getText("[data-test='employer-industry']");
  description = getText(".css-1sj9xzx");

  profileLink = item.querySelector("[data-test='cell-Jobs-url']");
  profileLink = profileLink ? profileLink.href : "";

  return { companyName, companyRating, reviews, salaries, jobs, location, companySize, industry, description, profileLink };
});

copy(formattedItems);
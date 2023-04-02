var INITIAL_LIST = ".result-item-ab";

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
  var companyName, description, phone, address, profileLink, bbbRating;

  companyName = getText(".eou9tt70");
  description = getText(".eou9tt71 + p");

  phone = getText(".e230xlr0");
  address = getText(".e230xlr0 + p");

  profileLink = item.querySelector(".eou9tt70");
  profileLink = profileLink ? profileLink.href : "";

  bbbRating = getText(".cluster > span.bds-body");
  bbbRating = bbbRating ? bbbRating.replace("BBB Rating: ", "") : "";

  return { companyName, description, phone, address, profileLink, bbbRating };
});

copy(formattedItems);
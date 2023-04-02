var INITIAL_LIST = ".iFjolb";

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

  var roleName, companyName, location, applySite, datePosted, roleType, roleLink;

  roleName = getText(".BjJfJf");
  companyName = getText(".vNEEBe");

  location = getText(".Qk80Jf:nth-child(2)");
  applySite = getText(".Qk80Jf:nth-child(3)");

  datePosted = getText(".I2Cbhb:nth-child(1)");
  roleType = getText(".I2Cbhb:nth-child(2)");

  roleLink = item.querySelector(".pMhGee");
  roleLink = roleLink ? roleLink.href : "";

  return { roleName, companyName, location, applySite, datePosted, roleType, roleLink };
});

copy(formattedItems);
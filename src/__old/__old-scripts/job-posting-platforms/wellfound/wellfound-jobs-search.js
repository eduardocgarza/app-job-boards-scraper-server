var INITIAL_LIST = ".styles_component__uTjje";

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
  var companyName, companyPage, companyDescription, companySize, activelyHiring, roleName, rolePage, roleType, salaryRange, datePosted;

  companyName = getText(".styles_name__zvQcy");
  companyPage = item.querySelector(".styles_headerContainer__GfbYF > a");
  companyPage = companyPage ? companyPage.href : "";

  companyDescription = getText(".styles_subheader__SIX10");
  companySize = getText(".styles_companySize__gMajF");

  activelyHiring = getText(".styles_component__ejzCg");
  activelyHiring = activelyHiring.includes("Actively Hiring");

  roleName = getText(".styles_title__xpQDw");
  rolePage = item.querySelector(".styles_component__Ey28k > a");
  rolePage = rolePage ? rolePage.href : "";

  roleType = getText(".styles_location__O9Z62");
  salaryRange = getText(".styles_compensation__3JnvU");
  datePosted = getText(".styles_activity__trEBS");

  return { companyName, companyPage, companyDescription, companySize, activelyHiring, roleName, rolePage, roleType, salaryRange, datePosted };
});

copy(formattedItems);
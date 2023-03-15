var INITIAL_LIST = ".react-job-listing"

var items = [...document.querySelectorAll(INITIAL_LIST)]

function setupText(dom) {
  return function getText(query) {
    var item = dom.querySelector(query)
    item = item ? item.textContent : ""
    item = item.trim()
    return item
  }
}

function convertToNum(text) {
	var format = text
	format = format.replace("K", "000")
	format = format.replace("M", "000000")
	return Number(format).toLocaleString()
}

var formattedItems = items.map(item => {
  var getText = setupText(item)
  var companyName, roleName, location, salaryRange, companyPage, companyRating, easyApply

  companyName = getText(".css-l2wjgv")
  roleName = getText(".css-1rd3saf")

  location = getText(".e1rrn5ka0")
  salaryRange = getText(".css-1xe2xww")
  salaryRange = salaryRange.split("(")[0]
    
  companyPage = item.querySelector(".css-l2wjgv")
  companyPage = companyPage ? companyPage.href : ""

  companyRating = getText(".css-2lqh28")
  easyApply = getText(".css-r3emcz")
  easyApply = easyApply.includes("Easy Apply")

  return {companyName, roleName, location, salaryRange, companyPage, companyRating, easyApply}
})

copy(formattedItems)
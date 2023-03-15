var INITIAL_LIST = ".job-search-resultsstyle__JobCardWrap-sc-1wpt60k-5"

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

  var roleName, rolePage, companyName, location, salaryRange, datePosted

  rolePage = item.querySelector("[data-testid='svx_jobCard-title']")
  rolePage = rolePage ? rolePage.href : ""

  roleName = getText("[data-testid='svx_jobCard-title']")
  companyName = getText("[data-testid='svx_jobCard-company']")
  location = getText("[data-testid='svx_jobCard-location']")
  salaryRange = getText("[data-testid='svx_jobCard-details']")
  datePosted = getText("[data-testid='svx_jobCard-date']")

  return {roleName, rolePage, companyName, location, salaryRange, datePosted }
})

copy(formattedItems)
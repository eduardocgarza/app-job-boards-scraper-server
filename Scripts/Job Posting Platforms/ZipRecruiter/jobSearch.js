var INITIAL_LIST = ".job_result"

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
  var roleName, rolePage, companyName, companyPage, location, jobType, description

  roleName = getText(".job_title")
  
  rolePage = item.querySelector(".job_link")
  rolePage = rolePage ? rolePage.href : ""

  companyName = getText(".t_org_link")

  companyPage = item.querySelector(".t_org_link")
  companyPage = companyPage ? companyPage.href : ""

  location = getText(".t_location_link")
  jobType = getText("h3[title='Employment Type'] + p")

  description = getText(".job_snippet")

  return {roleName, rolePage, companyName, companyPage, location, jobType, description}
}).filter(v => !!v.roleName)

copy(formattedItems)
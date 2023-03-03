var INITIAL_LIST = "li.provider"

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
  var companyName, companyPage, companyWebsite, tagline, rating, reviews, companySize, location

  companyName = getText("h3.company_info")

  companyPage = item.querySelector("li.website-profile a")
  companyPage = companyPage ? companyPage.href : ""

  companyWebsite = item.querySelector("h3.company_info a")
  companyWebsite = companyWebsite ? companyWebsite.href : ""

  tagline = getText("p.tagline")
  rating = getText(".rating")
  reviews = getText(".reviews-link")
  companySize = getText("[data-content='<i>Employees</i>']")
  location = getText("[data-content='<i>Location</i>']")

  return {companyName, companyPage, companyWebsite, tagline, rating, reviews, companySize, location}
})

copy(formattedItems)
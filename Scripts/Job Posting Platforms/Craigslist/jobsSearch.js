var INITIAL_LIST = ".cl-search-result"

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
  var roleName, rolePage, companyName, location, datePosted

  roleName = getText(".titlestring")

  rolePage = item.querySelector(".titlestring")
  rolePage = rolePage ? rolePage.href : ""

  companyName = getText(".meta")
  companyName = companyName.split("·")[2]
  companyName = companyName ? companyName.replace("hide", "") : ""

  location = getText(".supertitle")

  datePosted = item.querySelector(".meta:nth-child(1)")
  datePosted = datePosted ? datePosted.getAttribute("title") : ""

  return { roleName, rolePage, companyName, location, datePosted }
})

copy(formattedItems)
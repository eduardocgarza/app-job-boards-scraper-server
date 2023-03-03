var INITIAL_LIST = ".result-item-ab"

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
  var companyName, description, bbbRating, phone, address, profileLink

  companyName = getText(".eou9tt70")
  description = getText(".eou9tt71 + p")

  phone = getText(".e230xlr0")
  address = getText(".e230xlr0 + p")

  profileLink = item.querySelector(".eou9tt70")
  profileLink = profileLink ? profileLink.href : ""
  
  return {companyName, description, bbbRating, phone, address, profileLink}
})

copy(formattedItems)
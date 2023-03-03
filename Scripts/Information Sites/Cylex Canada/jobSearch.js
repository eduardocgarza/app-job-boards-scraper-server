var INITIAL_LIST = ".lm-item"

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
  var companyName, address, phone, description, website

  companyName = getText("div.h4.bold")

  var addressLine1 = getText(".lm-adr-ln2")
  var addressLine2 = getText(".lm-adr-ln2 + p")
  
  address = `${addressLine1} ${addressLine2}`
  phone = getText(".lm-adr-ln4")
  description = 
  website = getText(".lm-features li:nth-child(2)")
  if(website.includes("Website")) {
    website = item.querySelector(".lm-features li:nth-child(2) a")
    website = website ? website.href : ""
  } else {
    website = ""
  }
  
  return {companyName, address, phone, description, website}
})

copy(formattedItems)
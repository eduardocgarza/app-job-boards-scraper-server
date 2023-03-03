var INITIAL_LIST = "#job-list li"

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
  var roleName, rolePage, companyName, location, description, datePosted, quickApply

  roleName = getText(".jobposting-title")
  rolePage = item.querySelector(".jobposting-title a")
  rolePage = rolePage ? rolePage.href : ""
  
  companyName = getText(".jobposting-company")
  location = getText(".jobposting-location")
  description = getText(".jobposting-snippet")

  datePosted = item.querySelector(".SerpJob-timestamp time")
  datePosted = datePosted ? datePosted.getAttribute("datetime") : "" 
  if(datePosted) {
    datePosted = new Date(datePosted).toLocaleDateString()
  }
  
  quickApply = getText(".SerpJob-simplyApplyLabel")
  quickApply = quickApply.includes("Quick apply")

  return {roleName, rolePage, companyName, location, description, datePosted, quickApply}
})

copy(formattedItems)
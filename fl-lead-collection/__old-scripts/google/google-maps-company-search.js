var INITIAL_LIST = ".Nv2PK"

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
  var companyName, rating, reviews, companyType, address, phone, googleMaps, website

  companyName = getText(".qBF1Pd")
  rating = getText(".MW4etd")
  reviews = getText(".UY7F9")
  reviews = reviews ? reviews.replace("(", "").replace(")", "") : ""

  companyType = getText(".W4Efsd span[jstcache='883'][jsinstance='0']")
  companyType = companyType.replace("·", "")
  companyType = companyType.trim()

  address = getText(".W4Efsd span[jstcache='883'][jsinstance='*1']")
  address = address.replace("·", "")
  address = address.trim()

  phone = getText(".W4Efsd[jstcache='882'][jsinstance='*1'] span[jstcache='883'][jsinstance='*1']")
  phone = phone.replace("·", "")
  phone = phone.trim()
  
  googleMaps = item.querySelector("a.hfpxzc")
  googleMaps = googleMaps ? googleMaps.href : ""
  
  website = item.querySelector(".lcr4fd")
  website = website ? website.href : ""

  return {companyName, rating, reviews, companyType, address, phone, googleMaps, website}
})

copy(formattedItems)
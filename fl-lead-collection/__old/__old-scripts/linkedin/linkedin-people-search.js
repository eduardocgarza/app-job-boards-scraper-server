// Used By

// 3. Linkedin Communities
// 4. Linkedin Services Search (Candidates)
// 5. Linkedin People Search

var INITIAL_LIST = ".reusable-search__result-container"

var items = [...document.querySelectorAll(INITIAL_LIST)]

function getText(dom, query) {
	var item = dom.querySelector(query)
	item = item ? item.textContent : ""
	item = item.trim()
	return item
}

function convertToNum(text) {
	var format = text
	format = format.replace("K", "000")
	format = format.replace("M", "000000")
	format = Number(format).toLocaleString()
	format = format.replace("NaN", "0")
	return format
}

var formattedItems = items.map(item => {
	var personName, tagline, location, followers, profieLink

	personName = getText(item, ".entity-result__title-text > a")
	personName = personName.split("View ")
	personName = personName[0]

	profieLink = item.querySelector(".entity-result__title-text > a")
	profieLink = profieLink ? profieLink.href : ""

	tagline = getText(item, ".entity-result__primary-subtitle")
	location = getText(item, ".entity-result__secondary-subtitle")

	followers = getText(item, ".entity-result__simple-insight-text")
	followers = followers ? followers.split("followers")[0] : ""
	followers = convertToNum(followers)

	return { personName, tagline, location, followers, profieLink }
})

copy(formattedItems)

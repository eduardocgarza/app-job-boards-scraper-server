// Used By

// 2. Linkedin Jobs Search

var INITIAL_LIST = ".jobs-search-results__list-item"

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
	return Number(format).toLocaleString()
}

var formattedItems = items.map(item => {
	var roleName, companyName, location, roleType, activelyRecruiting, applicants, datePosted, rolePage, easyApply

	roleName = getText(item, ".job-card-list__title")
	companyName = getText(item, ".job-card-container__company-name")

	location = getText(item, ".job-card-container__metadata-item")
	roleType = getText(item, ".job-card-container__metadata-item--workplace-type")

	activelyRecruiting = getText(item, ".job-flavors__label")
	activelyRecruiting = activelyRecruiting.includes("Actively recruiting")

	applicants = getText(item, ".job-card-container__applicant-count")
	datePosted = getText(item, ".job-card-container__listed-time")

	rolePage = document.querySelector(".job-card-list__title")
	rolePage = rolePage ? rolePage.href : ""
	rolePage = rolePage.trim()

	easyApply = getText(item, ".job-card-container__apply-method")
	easyApply = easyApply.includes("Easy Apply")

	return { roleName, companyName, location, roleType, activelyRecruiting, applicants, datePosted, rolePage, easyApply }
})

copy(formattedItems)
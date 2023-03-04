// Used By

// 1. Linkedin Company Search

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
	return Number(format).toLocaleString()
}

var formattedItems = items.map(item => {
	var companyName, description, category, location, followers, jobs, companyPage

	companyName = getText(item, ".entity-result__title-text")
	description = getText(item, ".entity-result__summary")
	category = getText(item, ".entity-result__primary-subtitle")
	category = category.split(" • ")
	if(category.length == 2) {
		location = category[1]
		category = category[0]
	} else {
		category = category[0]
	}
	
	followers = getText(item, ".entity-result__secondary-subtitle")
	followers = followers.replace(" followers", "")
	followers = convertToNum(followers)	

	jobs = getText(item, ".entity-result__simple-insight:nth-child(2)")
	if (jobs === "") {
		jobs = getText(item, ".entity-result__simple-insight")
	}
	jobs = jobs.replace(" jobs", "")
	jobs = convertToNum(jobs)
	jobs = jobs.replace("NaN", "0")

	companyPage = document.querySelector(".entity-result__title-text a")
	companyPage = companyPage ? companyPage.href : ""
	
	return { companyName, description, category, location, followers, jobs, companyPage }
})

copy(formattedItems)
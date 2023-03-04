var INITIAL_LIST = ".jobsearch-ResultsList li"

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

  var companyName, companyPage, rolePage, roleName, companyRating, location, salaryRange, description, datePosted, easyApply, responsiveEmployer, urgentHiring, multipleCandidates

  companyName = getText(".companyOverviewLink")
  if(!companyName) {
    companyName = getText(".companyName")
  }

  companyPage = item.querySelector(".companyOverviewLink")
  companyPage = companyPage ? companyPage.href : ""

  rolePage = item.querySelector(".jcs-JobTitle")
  rolePage = rolePage ? rolePage.href : ""
    
  roleName = getText(".jcs-JobTitle")
  companyRating = getText(".ratingNumber")
  location = getText(".companyLocation")
  
  salaryRange = getText(".salary-snippet-container")
  description = getText(".job-snippet")
  datePosted = getText(".date")
  datePosted = datePosted ? datePosted.replace("Posted", "") : ""
  datePosted = datePosted ? datePosted.replace("Posted", "") : ""
  datePosted = datePosted.trim()

  easyApply = getText(".indeedApply")
  easyApply = easyApply.includes("Easily apply")

  responsiveEmployer = getText(".responsiveEmployer")
  responsiveEmployer = responsiveEmployer.includes("Responsive employer")

  urgentHiring = getText(".urgentlyHiring")
  urgentHiring = urgentHiring.includes("Urgently hiring")

  multipleCandidates = getText(".hiringMultipleCandidates")
  multipleCandidates = multipleCandidates.includes("multiple candidates")

  return {companyName, companyPage, rolePage, roleName, companyRating, location, salaryRange, description, datePosted, easyApply, responsiveEmployer, urgentHiring, multipleCandidates}
}).filter(v => !!v.roleName)

copy(formattedItems)
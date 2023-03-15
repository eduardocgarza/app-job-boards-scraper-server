// Note -- This was implemented with Puppeteer instead since dynamic content was required.
const url = createScrapeURL("https://www.glassdoor.com/job-listing/software-engineering-manager-darkvision-JV_IC2302478_KO0,28_KE29,39.htm?jl=1008314497249&pos=104&ao=1110586&s=58&guid=00000186dc34c38e8b60b0d586bddfe1&src=GD_JOB_AD&t=SR&vt=w&ea=1&cs=1_a9ac139c&cb=1678731691291&jobListingId=1008314497249&cpc=967BF0C4231BAF98&jrtk=3-0-1gre39gtipkds801-1gre39gufh7js800-ad108e75335931c4--6NYlbfkN0BDAtkAoZ8kh_xTc9tEKZUV0HqdactMIEvv3az5sbRcnLGHhxZ14JMew61IyNDggpKtNSaDJBqaIKAdit9EQqGnA7cYeRHR-k1QsgouaJEIHQBfByagXlI6R5FzWE8MbZXgY7_vmvFae0fwbGrOXaL2_Kmv85bG0YT6XAL8kYZ-2CR-6RZ-MTX06xvRZKhKN46cdkgTAQnso6gKts0LCAX_V4ey9xD5P48ueeqYnUthNyB--HcsW9FB3Q10PT5-LdSB2P-X44lnzsYvX2XX_IvSriQHgCmBtnqIJq4Xe_SRWAjDB0dDUsu5Uel_eAN0F_V3iJTATEyzxgiywihQ3OD8lnwd_0RFsdZJ7fjWEJV3Rg_zum3EptoZubPlUBvip6PoacM0vHPHtHBm0aKiOCY4MoIIhNm59T6idbBHmgoFrYOBf11tr49BVUNlgl8B34uo0dCUpj7cxobuTRYovPCSC9IOM9NPVjT8ZXbwyeaOC9K4WtBGPb2czgySoRScLRa6BpWfSKmKVBAr087bEWspofxl73quoPA%253D&ctt=1678731770868")

async function getCompany() {
  console.log("Getting company info...")

  const page = await axios(url)
  console.log("page")
  const html = await page.data
  console.log("html")
  const $ = cheerio.load(html)

  var website = $(element).find(".value.website a").attr("href")
  console.log("website: ", website)
  
  console.log("gotCompany")
  
  // Print the whole html content to an html file
  fs.writeFileSync('./company.html', html)
}
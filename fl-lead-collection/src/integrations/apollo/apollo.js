const axios = require("axios");
const fs = require("fs");

/**
 * 
 * @Notes
 * 
 * @Apollo 
 * Gives you FREE access to the Search API
 * ** Does not reveal emails (sometimes), but you get Linkedin, Full Name and everything else
 *  50 per minute
 *  100 per hour
 *  300 per day
 *  300 calls/day x 10 people/call = 3k people/day
 * 
 *  300/day x 30 days = 9000 api calls
 *  10 people/call x 9k api calls per month = 90,000 people
 * 
 * Assuming we get on average 10 people per Job Post, we're getting 9k posts per month
 * 
 * $50 per month for
 * > 100 per minute
 * > 200 per hour
 * > 1k per day
 * 
 * $100 per month
 * > SAME AMOUNT
 * 
 * $400 per month
 * > 100 per minute
 * > 300 per hour
 * > 3k per day
 * 
 * 
 * @Snovio
 * Gives you FREE emails if you have (Website, FN, LN) .. and social links??
 * If phone numbers are not important UNLESS they're HOT LEADS, then
 * 
 * 1. Use Apollo to get FREE People Data and 
 * 2. Take that data to Snovio to get FREE emails 
 * 3. Use Neverbounce API to clean the emails
 * 
 * -- Free emails and contact information --
 * 
 * 
 */

const ROCKETREACH_TOKEN = "eaa4d7k49ef4a2747f931ad86de6809470b3cda";
const APOLLO_TOKEN = "7xcoiuQklsaEFfCpSbXRJg";

const jobTitles = [
  "CEO",
  "CTO",
  "COO",
  "director",
  "manager",
];

function convertToStr(arr) {
  return arr.join("\n");
}

const companyURLs = [
  "google.com",
  "facebook.com",
  "apple.com",
  "microsoft.com",
];

const config = {
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
};

async function apolloPeople() {
  const url = "https://api.apollo.io/v1/mixed_people/search";

  const body = {
    api_key: APOLLO_TOKEN,
    person_titles: jobTitles,
    q_organization_domains: convertToStr(companyURLs),
    page: 1,
  };

  const response = await axios.post(url, body, config);
  console.log("Response: ", response.data);
  fs.writeFileSync("./apollo.json", JSON.stringify(response.data));
  console.log("Done!");
}

; (async function () {
  const rawData = fs.readFileSync("./apollo.json");
  const data = JSON.parse(rawData);

  const { people } = data;
  // console.log("People: ", people.length)
  console.log(people[0]);

  fs.writeFileSync("./apollo-people.json", JSON.stringify(people));

})();
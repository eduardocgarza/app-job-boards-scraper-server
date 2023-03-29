/** 
  @Part1 – Get Company Info
    1. Manually create the searches ahead of time to get the following properties
      Location – Location ID and Location Keyword (locName)
      Job Keyword (occ)

    2. Execute the search with all parameters (outlined below)
    3. Scrape All Pages
      The number of results  is displayed in the company size button
      The results per page is 10, you you can calculate the number of pages to search
    4. Repeat the Search for All Company Sizes
      - Company Size = 1-50
      - Company Size = 51-200
      - Company Size = 201-500
      - Company Size = 501-1000
      - Company Size = 1001-5000
      - Company Size = 5001-10000
      - Company Size = 10000+

  @Part2 – Get Company Info
    5. Create a Unique List of Companies from the Posting that exactly match the Company Name
    6. Iterate through Unique Companies and go to the Profile URL to get the Company Information

  @Part3 – Get All Jobs
    7. Go to the Jobs Tab and go scrape all job postings
    8. Check your new postings against your existing postings using the jobListingId in the Job Posting URL and your Output should be a finalized list of Job Postings for 1-(Location, Role) search.
      - Repeat for All Locations, All Roles, removing duplicates along the way and at the end.
*/

async function getGlassdoorCompaniesSearchList(searchObject) {}

async function getGlassdoorCompanyProfiles(searchId) {}

export default async function getGlassdoorCompaniesSearchData(searchObject) {
  const { searchId } = searchObject;
  await getGlassdoorCompaniesSearchList(searchObject);
  await getGlassdoorCompanyProfiles(searchId);
}

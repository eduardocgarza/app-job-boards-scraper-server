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

import { pool } from "@/database/databaseConfiguration";
import { companiesTable, searchCompaniesTable } from "@/database/dbConstants";
import PuppBrowser from "@/helpers/PuppBrowser";
import { IExecuteSearchObject } from "@/types/appInterfaces";

async function getGlassdoorCompaniesSearchList(searchObject: IExecuteSearchObject) {
  return [];
}

async function updateCompaniesToVerified(companyIds: number[], searchId: string) {
  if (!companyIds.length) {
    console.log("No companies to update to verified");
    return;
  }

  // Generate the dynamic IN clause with the appropriate placeholders
  const placeholders = companyIds.map((_, index) => `$${index + 1}`).join(", ");
  const query = `
    UPDATE ${companiesTable}
    SET verified = true
    WHERE company_id IN 
      (${placeholders}) OR 
      (verified = false AND company_id IN (
        SELECT company_id 
        FROM ${searchCompaniesTable} 
        WHERE search_id = ${searchId}
      )
    );
  `;

  const client = await pool.connect();
  try {
    await client.query(query, companyIds);
    console.log("Updated companies to verified:", companyIds);
  } catch (error) {
    throw new Error("Failed to update companies to verified: " + error);
  } finally {
    client.release();
  }
}

async function getGlassdoorCompanyProfiles(searchObject: IExecuteSearchObject) {
  const client = await pool.connect();

  const query = `
    SELECT company_id, company_profile_url
    FROM ${companiesTable}
    WHERE verified = false;
  `;
  try {
    const { rows } = await client.query(query);
    const companies = rows.filter((v) => !!v.company_profile_url);
    console.log("Retrieved: ", rows.length, " @getGlassdoorCompanyProfiles");
    console.log("Filtered: ", companies.length, " @getGlassdoorCompanyProfiles");

    const { page, closeBrowser } = await PuppBrowser();

    for (const company of companies) {
      console.log("---- NEXT ELEMENT: ", company.company_profile_url);
      await page.goto(company.company_profile_url);

      const selector = "a[data-test='employer-website']";
      const elementHandle = await page.$(selector);
      if (elementHandle) {
        // If the element exists, perform desired actions
        const href = await page.evaluate((el) => el.getAttribute("href"), elementHandle);
        if (href && !href.includes("undefined")) {
          await client.query(
            `
            UPDATE ${companiesTable}
            SET website_url = $1
            WHERE company_id = $2;
          `,
            [href, company.company_id],
          );
          console.log("** UPDATED COMPANY SUCCESSFULLY.");
        }
        console.log("** Element found with href:", href);

        // You can also click the link if needed
        // await elementHandle.click();
      } else {
        console.log("Element not found");
      }
    }

    const companyIds = rows.map((v) => v.company_id);
    await updateCompaniesToVerified(companyIds, searchObject.searchId);

    await closeBrowser();
  } catch (error) {
    console.error("Error @getGlassdoorCompanyProfiles: ", error);
  } finally {
    client.release();
  }
}

export default async function getGlassdoorCompaniesSearchData(searchObject: IExecuteSearchObject) {
  console.log("Starting @getGlassdoorCompaniesSearchData");
  const { searchId } = searchObject;
  // await getGlassdoorCompaniesSearchList(searchObject);
  await getGlassdoorCompanyProfiles(searchObject);
  console.log("Ending @getGlassdoorCompaniesSearchData");
}

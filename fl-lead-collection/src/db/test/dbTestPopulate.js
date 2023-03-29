import { JOB_PLATFORMS } from "../../appConstants.js";
import { SEARCH_ROLES } from "../../searches/Glassdoor/scripts/glassdoorConstants.js";
import { pool } from "../dbConfig.js";
import { DB_TABLE_NAMES } from "../dbConstants.js";
import { createSearchRecord } from "../testTables.js";

function convertToCamelCase(obj) {
  return Object.keys(obj).reduce(
    (acc, key) =>
      Object.assign(acc, { [key.replace(/_([a-z])/g, g => g[1].toUpperCase())]: obj[key] }),
    {}
  );
}

function createRandomSearches(numSearches) {
  return Array.from({ length: numSearches }, (_, i) => ({
    campaignName: `Campaign ${i + 1}`,
    campaignDescription: `Search for campaign ${i + 1}`,
    locationName: `Location ${i + 1}`,
    roles: SEARCH_ROLES,
    platforms: JOB_PLATFORMS
  }));
}

async function insertSearchRecords(searches) {
  return await Promise.all(
    searches.map(search => createSearchRecord(search))
  );
}

function groupPostingsByCompany(jobPostings) {
  return jobPostings.reduce((acc, posting) => {
    if (acc[posting.companyName]) {
      acc[posting.companyName].push(posting);
    }
    else {
      acc[posting.companyName] = [posting];
    }
    return acc;
  }, {});
}

function getRandomPostings(array, size) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

function getUniqueCompanies(postings, key) {
  const map = new Map();
  return postings.reduce((acc, obj) => {
    if (!map.has(obj[key])) {
      map.set(obj[key], true);
      acc.push(obj);
    }
    return acc;
  }, []);
}

function getUniqueCompaniesByName(postings) {
  return getUniqueCompanies(postings, 'companyName');
}

function getUniqueCompaniesById(postings) {
  return getUniqueCompanies(postings, 'companyId')
}

async function insertCompanyRecords(allCompanies) {
  const query = `
    INSERT INTO ${DB_TABLE_NAMES.companiesTable} (company_name)
    SELECT unnest($1::text[]) AS company_name
    ON CONFLICT (company_name) DO UPDATE SET company_name = EXCLUDED.company_name
    RETURNING *
  `;
  const { rows } = await pool.query(query, [allCompanies]);
  return rows.map(company => ({
    companyId: company.company_id,
    companyName: company.company_name
  }));
}

function createCompanyMap(companies) {
  const companyMap = {};
  companies.forEach(company => {
    companyMap[company.companyName] = company.companyId;
  });
  return companyMap;
}

async function createSearchRecords() {
  const searches = createRandomSearches(10);
  return await insertSearchRecords(searches)
}

async function createCompanyRecords(jobPostings) {
  const uniqueCompanies = getUniqueCompaniesByName(jobPostings);
  const allCompanies = uniqueCompanies.map(company => company.companyName);
  const companyRecords = await insertCompanyRecords(allCompanies);
  return createCompanyMap(companyRecords);
}

async function createJobPostingRecords(jobPostings, companiesHashMap) {
  try {
    const values = jobPostings.map(posting => [
      posting.roleName,
      posting.roleLocation,
      posting.salaryRange,
      posting.jobPostingURL,
      posting.datePosted,
      companiesHashMap[posting.companyName],
      posting.glassdoorJobPostingId
    ]);
    const query = `
      INSERT INTO ${DB_TABLE_NAMES.jobPostingsTable} 
      (
        role_name, 
        role_location, 
        salary_range, 
        posting_url, 
        date_posted, 
        company_id, 
        glassdoor_posting_id
      )
      VALUES ${values.map((_, i) => `($${7 * i + 1}, $${7 * i + 2}, $${7 * i + 3}, $${7 * i + 4}, $${7 * i + 5}, $${7 * i + 6}, $${7 * i + 7})`).join(",")}
      RETURNING *
    `;
    const { rows } = await pool.query(query, values.flat());
    return rows.map(convertToCamelCase);
  } 
  catch (error) {
    console.error("Error creating job posting records: ", error);
    throw error;
  }
}

async function createSearchPostingRecord(searchId, jobPostings) {
  const searchPostingsValues = jobPostings.map(posting => [posting.postingId, searchId]);
  const insertSearchPostingsQuery = `
    INSERT INTO ${DB_TABLE_NAMES.searchJobPostingsTable} (posting_id, search_id)
    VALUES ${searchPostingsValues.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",")}
  `;
  await pool.query(insertSearchPostingsQuery, searchPostingsValues.flat());
}

async function createSearchCompanyRecord(searchId, jobPostings) {
  const searchCompanies = getUniqueCompaniesById(jobPostings)
  const searchCompaniesValues = searchCompanies.map(company => [company.companyId, searchId]);
  const insertSearchCompaniesQuery = `
    INSERT INTO ${DB_TABLE_NAMES.searchCompaniesTable} (company_id, search_id)
    VALUES ${searchCompaniesValues.map((_, i) => `($${2 * i + 1}, $${2 * i + 2})`).join(",")}
  `;
  await pool.query(insertSearchCompaniesQuery, searchCompaniesValues.flat());
}

export async function populateDatabase(jobPostings) {
  try {
    const searchRecords = await createSearchRecords();    
    const companiesHashMap = await createCompanyRecords(jobPostings);
    const updatedPostings = await createJobPostingRecords(jobPostings, companiesHashMap)

    for (const {searchId} of searchRecords) {
      const searchPostings = getRandomPostings(updatedPostings, 15);
      await createSearchPostingRecord(searchId, searchPostings)
      await createSearchCompanyRecord(searchId, searchPostings)
    }
    console.log("Database populated successfully.");
  }
  catch (e) {
    console.error("Error populating database:", e);
    throw e;
  }
}
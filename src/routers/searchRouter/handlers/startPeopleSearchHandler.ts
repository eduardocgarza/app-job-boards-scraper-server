import { Response } from "express";
import { ISearchRequest } from "@/types/requestInterfaces";
import { searchSchema } from "../validators/searchValidation";
import getSearchObject from "@/database/databaseActions/getSearchObject";
import { pool } from "@/database/databaseConfiguration";
import { companiesTable, searchCompaniesTable } from "@/database/dbConstants";
import getApolloData from "@/integrations/apollo/actions/getApolloData";
import fs from "fs";

interface ICompanyItem {
  company_id: number;
  website_url: string;
}

function chunkArray(array: ICompanyItem[], chunkSize: number): any[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const decisionMakerRoles = ["CEO", "COO", "CTO", "Founder", "Co-founder", "Human Resources", "Manager"];

export default async function startPeopleSearchHandler(req: ISearchRequest, res: Response) {
  const { error } = searchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const searchObject = await getSearchObject(req.body.searchId);
  console.log("Starting @getApolloData");

  // 1. Get all (company_id, website_url), where website_url exists
  const client = await pool.connect();

  try {
    const { rows: companies } = await client.query(
      `
    SELECT c.company_id, c.website_url
    FROM ${companiesTable} AS c
    JOIN ${searchCompaniesTable} 
      AS sc ON c.company_id = sc.company_id
    WHERE sc.search_id = $1 AND c.website_url <> '';
  `,
      [searchObject.searchId],
    );
    console.log("Number of Companies: ", companies.length);

    // 2. Split all results into a list of (lists of 10)
    const companyLists = chunkArray(companies, 10);
    console.log("Number of Company Lists: ", companyLists.length);

    const apolloObjects = companyLists.map((companyList) => {
      return {
        domains: companyList.map((company) => company.website_url),
        titles: decisionMakerRoles,
      };
    });
    console.log(apolloObjects);

    for (const [index, apolloSearch] of Object.entries(apolloObjects)) {
      if (index === "1") return;
      console.log(`Starting Apollo Search ${index} of ${apolloObjects.length}...`);
      const data = await getApolloData(apolloSearch);
      fs.writeFileSync(`./apollo-${index}.json`, JSON.stringify(data, null, 2));
      console.log("Data from Apollo: ", data);
    }

    // 3. For each list of 10, run getApolloData
    // Store the results in people in the database

    console.log(searchObject);
    return res.json(searchObject);
  } catch (error) {
    console.log("Error: ", error);
  }
}

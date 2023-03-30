const { AIRTABLE_FL_AUTH_TOKEN, AIRTABLE_FL_BASE_ID, AIRTABLE_FL_WORKSPACE_ID } =
  process.env;

export const ADD_RECORDS_BATCH_SIZE = 10;

// https://airtable.com/developers/web/api/rate-limits
// If you exceed this rate, you will receive a 429 status code and will need to wait 30 seconds before subsequent requests will succeed.
export const API_CALLS_PER_SECOND = 5;
export const OUR_API_CALLS_PER_SECOND = 4;
export const API_SLEEP_AMOUNT = 1000 / OUR_API_CALLS_PER_SECOND;

export const AIRTABLE_TOKEN = AIRTABLE_FL_AUTH_TOKEN;
export const AIRTABLE_BASE_ID = AIRTABLE_FL_BASE_ID;
export const AIRTABLE_WORKSPACE_ID = AIRTABLE_FL_WORKSPACE_ID;

export const AIRTABLE_API = {
  baseURL: "https://api.airtable.com/v0",
};

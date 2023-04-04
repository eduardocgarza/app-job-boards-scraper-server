// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function searchConverterOut(obj: any) {
  return {
    searchId: obj.search_id,
    campaignName: obj.campaign_name,
    campaignDescription: obj.campaign_description,
    locationName: obj.location_name,
    roles: obj.roles,
    platforms: obj.platforms,
    createdAt: obj.created_at,
    searchStatusId: obj.search_status_id,
    searchStatusProgressPercentage: obj.search_status_progress_percentage,
    searchCompaniesAirtableId: obj.search_companies_airtable_id,
    searchCompaniesAirtablePrimaryFieldId: obj.search_companies_airtable_primary_field_id,
    searchPostingsAirtableId: obj.search_postings_airtable_id,
    searchPostingsAirtablePrimaryFieldId: obj.search_postings_airtable_primary_field_id,
    peopleAirtableId: obj.people_airtable_id,
    peopleAirtablePrimaryFieldId: obj.people_airtable_primary_field_id,
    leadsAirtableId: obj.leads_airtable_id,
    leadsAirtablePrimaryFieldId: obj.leads_airtable_primary_field_id,
  };
}

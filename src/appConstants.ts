export const JOB_PLATFORMS = (() => {
  const jobPlatforms = {
    GLASSDOOR: "Glassdoor",
    INDEED: "Indeed",
    LINKEDIN: "Linkedin",
    MONSTER: "Monster",
    ZIPRECRUITER: "ZipRecruiter",
  };

  const getNames = () => Object.values(jobPlatforms);
  const getHashMap = () => jobPlatforms;

  return {
    getNames,
    getHashMap,
  };
})();

// Glassdoor

export const DB_SEARCH_STATUSES = [
  {
    statusId: 1,
    statusName: "jobs_search_pending_start",
  },
  {
    statusId: 2,
    statusName: "jobs_search_in_progress",
  },
  {
    statusId: 3,
    statusName: "jobs_search_complete",
  },
  {
    statusId: 4,
    statusName: "verification_pending_start",
  },
  {
    statusId: 5,
    statusName: "verification_in_progress",
  },
  {
    statusId: 6,
    statusName: "verification_complete",
  },
  {
    statusId: 7,
    statusName: "decision_makers_search_pending_start",
  },
  {
    statusId: 8,
    statusName: "decision_makers_search_in_progress",
  },
  {
    statusId: 9,
    statusName: "decision_makers_search_complete",
  },
  {
    statusId: 10,
    statusName: "decision_makers_selection_pending_start",
  },
  {
    statusId: 11,
    statusName: "decision_makers_selection_in_progress",
  },
  {
    statusId: 12,
    statusName: "decision_makers_selection_complete",
  },
  {
    statusId: 13,
    statusName: "leads_preparation_pending_start",
  },
  {
    statusId: 14,
    statusName: "leads_preparation_in_progress",
  },
  {
    statusId: 15,
    statusName: "leads_preparation_complete",
  },
];

function createStatusesHashMap() {
  const hashMap: { [key: number]: { statusId: number; statusName: string } } = {};
  DB_SEARCH_STATUSES.forEach((status) => {
    hashMap[status.statusId] = status;
  });
  return hashMap;
}

export const DB_SEARCH_STATUSES_HASHMAP = createStatusesHashMap();

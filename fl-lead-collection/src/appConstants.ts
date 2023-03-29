
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
    getHashMap
  };
})();
export const GLASSDOOR_MAX_JOB_PAGES = 30;
export const GLASSDOOR_POSTS_PER_PAGE = 30;

export const GLASSDOOR_JOBS_EASY_APPLY = {
  EASY: 1,
  REGULAR: 0,
};

// Units in days
export const GLASSDOOR_JOBS_DATE_POSTED = {
  THREE: 3,
  SEVEN: 7,
  FOURTEEN: 14,
  THIRTY: 30,
};

// Units in miles
export const GLASSDOOR_JOBS_DISTANCE = {
  FIVE: 5,
  TEN: 10,
  FIFTEETH: 15,
  TWENTYFIVE: 25,
  FIFTY: 50,
  HUNDRED: 100,
};

// Units are generic numbers
export const GLASSDOOR_JOBS_COMPANY_SIZES = [
  {
    name: "1-200 employees",
    value: 1,
  },
  {
    name: "201-500 employees",
    value: 2,
  },
  {
    name: "1001-5000 employees",
    value: 3,
  },
  {
    name: "5001+ employees",
    value: 4,
  },
];

export const COMPANY_SIZES = [];

export const SEARCH_ROLES = [
  "frontend software engineer",
  "backend software engineer",
  "fullstack software engineer",
  "senior software engineer",
  "software engineering manager ",
  "iOS software engineer",
  "android software engineer",
  "mobile software engineer",
  "sysops software engineer",
  "database software engineer",
  "business analyst",
];

export const LOCATIONS = {
  canadaCities: {
    Victoria: {
      cityName: "Victoria",
      provinceName: "British Columbia",
      cityKeyword: "victoria",
      provinceKeyword: "british-columbia",
    },
    Vancouver: {
      cityName: "Vancouver",
      provinceName: "British Columbia",
      cityKeyword: "vancouver",
      provinceKeyword: "british-columbia",
    },
    Calgary: {
      cityName: "Calgary",
      provinceName: "Alberta",
      cityKeyword: "calgary",
      provinceKeyword: "alberta",
    },
    Edmonton: {
      cityName: "Edmonton",
      provinceName: "Alberta",
      cityKeyword: "edmonton",
      provinceKeyword: "alberta",
    },
    Winnipeg: {
      cityName: "Winnipeg",
      provinceName: "Manitoba",
      cityKeyword: "winnipeg",
      provinceKeyword: "manitoba",
    },
    Toronto: {
      cityName: "Toronto",
      provinceName: "Ontario",
      cityKeyword: "toronto",
      provinceKeyword: "ontario",
    },
    Ottawa: {
      cityName: "Ottawa",
      provinceName: "Ontario",
      cityKeyword: "ottawa",
      provinceKeyword: "ontario",
    },
    Montreal: {
      cityName: "Montreal",
      provinceName: "Quebec",
      cityKeyword: "montreal",
      provinceKeyword: "quebec",
    },
    QuebecCity: {
      cityName: "Quebec City",
      provinceName: "Quebec",
      cityKeyword: "quebec",
      provinceKeyword: "quebec",
    },
  },
  canadaProvinces: [
    {
      provinceName: "Alberta",
      provinceKeyword: "alberta",
    },
    {
      provinceName: "British Columbia",
      provinceKeyword: "british-columbia",
    },
    {
      provinceName: "Manitoba",
      provinceKeyword: "manitoba",
    },
    {
      provinceName: "Ontario",
      provinceKeyword: "ontario",
    },
    {
      provinceName: "Quebec",
      provinceKeyword: "quebec",
    },
  ],
  usaCities: {
    Seattle: {
      cityName: "Seattle",
      cityKeyword: "seattle",
      stateName: "Washington",
      stateKeyword: "washington-state",
    },
    Portland: {
      cityName: "Portland",
      cityKeyword: "portland",
      stateName: "Oregon",
      stateKeyword: "oregon",
    },
    LosAngeles: {
      cityName: "Los Angeles",
      cityKeyword: "los-angeles",
      stateName: "California",
      stateKeyword: "california",
    },
    SanDiego: {
      cityName: "San Diego",
      cityKeyword: "san-diego",
      stateName: "California",
      stateKeyword: "california",
    },
    SanJose: {
      cityName: "San Jose",
      cityKeyword: "san-jose",
      stateName: "California",
      stateKeyword: "california",
    },
    SanFrancisco: {
      cityName: "San Francisco",
      cityKeyword: "san-francisco",
      stateName: "California",
      stateKeyword: "california",
    },
    MountainView: {
      cityName: "Mountain View",
      cityKeyword: "mountain-view",
      stateName: "California",
      stateKeyword: "california",
    },
    SantaClara: {
      cityName: "Santa Clara",
      cityKeyword: "santa-clara",
      stateName: "California",
      stateKeyword: "california",
    },
    PaloAlto: {
      cityName: "Palo Alto",
      cityKeyword: "palo-alto",
      stateName: "California",
      stateKeyword: "california",
    },
    Sunnyvale: {
      cityName: "Sunnyvale",
      cityKeyword: "sunnyvale",
      stateName: "California",
      stateKeyword: "california",
    },
    RedwoodCity: {
      cityName: "Redwood City",
      cityKeyword: "redwood-city",
      stateName: "California",
      stateKeyword: "california",
    },
    Houston: {
      cityName: "Houston",
      cityKeyword: "houston",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    SanAntonio: {
      cityName: "San Antonio",
      cityKeyword: "san-antonio",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    Dallas: {
      cityName: "Dallas",
      cityKeyword: "dallas",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    Austin: {
      cityName: "Austin",
      cityKeyword: "austin",
      stateName: "Texas",
      stateKeyword: "texas",
    },
    Jacksonville: {
      cityName: "Jacksonville",
      cityKeyword: "jacksonville",
      stateName: "Florida",
      stateKeyword: "florida",
    },
    Miami: {
      cityName: "Miami",
      cityKeyword: "miami",
      stateName: "Florida",
      stateKeyword: "florida",
    },
    Tampa: {
      cityName: "Tampa",
      cityKeyword: "tampa",
      stateName: "Florida",
      stateKeyword: "florida",
    },
    NewYork: {
      cityName: "New York",
      cityKeyword: "new-york",
      stateName: "NewYork",
      stateKeyword: "new-york-state",
    },
    Boston: {
      cityName: "Boston",
      cityKeyword: "boston",
      stateName: "Massachusetts",
      stateKeyword: "massachusetts",
    },
    Chicago: {
      cityName: "Chicago",
      cityKeyword: "chicago",
      stateName: "Illinois",
      stateKeyword: "illinois",
    },
    Phoenix: {
      cityName: "Phoenix",
      cityKeyword: "phoenix",
      stateName: "Arizona",
      stateKeyword: "arizona",
    },
    Philadelphia: {
      cityName: "Philadelphia",
      cityKeyword: "philadelphia",
      stateName: "Pennsylvania",
      stateKeyword: "pennsylvania",
    },
  },
  usaStates: [
    {
      stateName: "Washington",
      stateKeyword: "washington-state",
    },
    {
      stateName: "Oregon",
      stateKeyword: "oregon",
    },
    {
      stateName: "California",
      stateKeyword: "california",
    },
    {
      stateName: "Texas",
      stateKeyword: "texas",
    },
    {
      stateName: "Florida",
      stateKeyword: "florida",
    },
    {
      stateName: "NewYork",
      stateKeyword: "new-york-state",
    },
    {
      stateName: "Massachusetts",
      stateKeyword: "massachusetts",
    },
    {
      stateName: "Illinois",
      stateKeyword: "illinois",
    },
    {
      stateName: "Arizona",
      stateKeyword: "arizona",
    },
    {
      stateName: "Pennsylvania",
      stateKeyword: "pennsylvania",
    },
  ],
};

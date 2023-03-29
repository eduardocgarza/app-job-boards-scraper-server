const axios = require('axios');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');
let jobListings = []
  ; (async function () {
    for (let pageNumber = 1; pageNumber < 31; pageNumber += 1) {
      const page = await axios(
        'http://api.scraperapi.com?api_key=51e43be283e4db2a5afb62660fc6ee44&url=https://www.glassdoor.it/Lavoro/milano-part-time-lavori-SRCH_IL.0,6_IC2802090_KO7,16_IP${pageNumber}.htm?includeNoSalaryJobs=true',
      );
      const html = await page.data;
      const $ = cheerio.load(html);
      let allJobs = $('[data-test="jobListing"]');
      allJobs.each((index, element) => {
        const jobTitle = $(element).find("a[data-test='job-link'] > span").text();
        const company = $(element).find('a.e1n63ojh0 > span').text();
        const jobLink = $(element).find("a[data-test='job-link']").attr('href');
        jobListings.push({
          'Job Title': jobTitle,
          'Hiring Company': company,
          'Job Link': 'https://www.glassdoor.it/' + jobLink,
        });
      });
      console.log(pageNumber + ' Done!');
    }
    const csv = new ObjectsToCsv(jobListings);
    await csv.toDisk('./glassdoorJobs.csv');
    console.log('Save to CSV');
    console.log(jobListings);
  })();

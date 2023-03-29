import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import apiRoutes from "./controllers/appRouter.js"
import { createSearchRecord } from "./db/testTables.js"

const SERVER_PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use("/", apiRoutes)

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`)
})

const GLASSDOOR_COMPANIES_PER_PAGE = 10

  ; (async () => {
    console.log("Main")

    // const jobPostings = await glassdoorDBGetJobPostings(1)
    const { searchId } = await createSearchRecord({
      "campaignName": "Campaign 1",
      "campaignDescription": "A test search",
      "locationName": "Vancouver",
      "roles": [
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
        "business analyst"
      ],
      "platforms": ["Glassdoor", "Indeed"]
    })

  })()
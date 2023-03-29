import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import apiRoutes from "./controllers/appRouter.js"
import { glassdoorDBGetJobPostings } from "./searches/Glassdoor/scripts/glassdoorDb.js"

const SERVER_PORT = 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use("/", apiRoutes)

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}.`)
})

const GLASSDOOR_COMPANIES_PER_PAGE = 10

;(async () => {
  console.log("Main")

  // const jobPostings = await glassdoorDBGetJobPostings(1)
  // console.log("jobPostings: ", jobPostings)



  
  
})()
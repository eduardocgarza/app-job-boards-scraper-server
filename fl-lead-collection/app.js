import dotenv from "dotenv"
dotenv.config()

import express from "express"
import execGlassdoorSearch from "./src/searches/Glassdoor/glassdoorSearch.js"
import execIndeedSearch from "./src/searches/Indeed/indeedSearch.js"
import execLinkedinSearch from "./src/searches/Linkedin/linkedinSearch.js"
import execMonsterSearch from "./src/searches/Monster/monsterSearch.js"
import execZipRecruiterSearch from "./src/searches/ZipRecruiter/zipRecruiterSearch.js"

const SERVER_PORT = 5000

const app = express()
app.use(express.json())

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

app.post("/search", async (req, res) => {
  const locationName = req.body.locationName
  if(!locationName) {
    console.log("Failed!")
    return res.status(400).send("@locationName is required.")
  }

  console.log("Sending back searchId")
  res.json({ searchId: generateRandomString() })
  
  await execGlassdoorSearch(locationName)
  await execIndeedSearch(locationName)
  await execLinkedinSearch(locationName)
  await execMonsterSearch(locationName)
  await execZipRecruiterSearch(locationName)
})

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}...`)
})
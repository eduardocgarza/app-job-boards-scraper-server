import axios from "axios";
const BASE_URL = "http://localhost:5000"

export async function fetchLocations() {
  try {
    const response = await axios.get(`${BASE_URL}/locations`);
    if(response.data) return response.data
    else return []
  }
  catch (error) {
    return []
  }
}

export async function fetchRoles() {
  try {
    const response = await axios.get(`${BASE_URL}/roles`);
    if(response.data) return response.data
    else return []
  }
  catch (error) {
    return []
  }
}

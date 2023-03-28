import axios from "axios";
const BASE_URL = "http://localhost:5000"

export async function fetchLocations() {
  const response = await axios.get(`${BASE_URL}/locations`);
  return response.data;
}

export async function fetchRoles() {
  const response = await axios.get(`${BASE_URL}/roles`);
  return response.data;
}

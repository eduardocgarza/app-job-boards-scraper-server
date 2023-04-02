import { fetchLocations, fetchRoles } from "api/api"
import React, { useContext, useEffect, useState } from "react"

const initialState = {}

const AppContext = React.createContext(initialState)

export function AppContextProvider(props) {
  const [locations, setLocations] = useState([])
  const [roles, setRoles] = useState([])

  console.log("appContext: ", locations, roles )

  useEffect(() => {
    async function fetchData() {
      const locationsData = await fetchLocations()
      setLocations(locationsData)
      const rolesData = await fetchRoles()
      setRoles(rolesData)
    }

    fetchData()
  }, [])

  const context = {
    locations,
    roles,
  }

  return (
    <AppContext.Provider value={context}>
      {props.children}
    </AppContext.Provider>
  )
}

export default function useAppContext() {
  return useContext(AppContext)
}

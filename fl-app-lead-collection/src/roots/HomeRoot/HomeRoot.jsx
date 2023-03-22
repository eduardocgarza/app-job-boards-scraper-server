import MainNav from "components/MainNav/MainNav"
import React from "react"
import { Outlet } from "react-router-dom"

export default function HomeRoot() {
  return (
    <div>
      <h1>HomeRoot</h1>
      <MainNav />
      <Outlet />
    </div>
  )
}
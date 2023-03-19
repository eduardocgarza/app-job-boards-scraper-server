import React from "react"
import { Link } from "react-router-dom"

export default function MainNav() {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/create">Initialize Search</Link>
      </li>
      <li>
        <Link to="/searches">My Searches</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>
    </div>
  )
}
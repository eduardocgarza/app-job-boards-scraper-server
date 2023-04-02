import React from "react"

const SEARCH_TABLE_COLUMNS = [
  "Campaign ID",
  "Campaign Location",
  "Date Created",
  "Current Stage",
]

export default function SearchTableHeader() {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th>
        {SEARCH_TABLE_COLUMNS.map(columnName => (
          <th scope="col" className="px-6 py-3" key={columnName}>
            {columnName}
          </th>
        ))}
      </tr>
    </thead>
  )
}
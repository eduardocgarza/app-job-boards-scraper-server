import React from "react"

const exampleValue = {
  campaignId: 1,
  campaignName: "Vancouver Search - Spring 2023",
  dateCreated: "2021-09-01",
  currentStatus: "Active",
}

export default function SearchTableItem() {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
        </div>
      </td>
      
      <td className="px-6 py-4">
        {exampleValue.campaignId}
      </td>
      <td className="px-6 py-4">
        {exampleValue.campaignName}
      </td>
      <td className="px-6 py-4">
        {exampleValue.dateCreated}
      </td>
      <td className="px-6 py-4">
        {exampleValue.currentStatus}
      </td>
    </tr>
  )
}
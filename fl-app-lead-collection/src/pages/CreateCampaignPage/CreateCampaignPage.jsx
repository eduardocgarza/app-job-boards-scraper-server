import React from "react"
import InputRoles from "./InputRoles/InputRoles"
import InputLocations from "./InputLocations/InputLocations"
import InputPlatforms from "./InputPlatforms/InputPlatforms"
import CreateCampaignHeader from "./CreateCampaignHeader"
import CreateCampaignFooter from "./CreateCampaignFooter"

export default function CreateCampaignPage() {
  return (
    <div className="container mx-auto bg-orange-200 p-4">
      <CreateCampaignHeader />
      <InputLocations />
      <InputRoles />
      <InputPlatforms />
      <CreateCampaignFooter />
    </div>
  )
}
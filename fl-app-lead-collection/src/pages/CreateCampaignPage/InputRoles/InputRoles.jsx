import React from "react";
import useAppContext from "state/AppContext";
import CheckboxRoleItem from "./CheckboxRoleItem";

export default function InputRoles() {
  const appContext = useAppContext();
  console.log("appContext: ", appContext)
  const { roles } = appContext;
  const { canadaCities, usaCities } = roles;
  const canadaLocations = canadaCities ? Object.values(canadaCities) : [];
  const usaLocations = usaCities ? Object.values(usaCities) : [];

  return (
    <div>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        {canadaLocations &&
          canadaLocations.map((city) => <CheckboxRoleItem key={city.keyword} role={city.cityName} />)}
      </ul>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        {usaLocations &&
          usaLocations.map((city) => <CheckboxRoleItem key={city.keyword} role={city.cityName} />)}
      </ul>
    </div>
  );
}

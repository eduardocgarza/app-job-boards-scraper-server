import React from "react";
import useAppContext from "state/AppContext";
import RadioLocationItem from "./RadioLocationItem";

export default function InputLocations() {
  var allCities = []
  const appContext = useAppContext();
  const { locations } = appContext;
  if(!locations && locations.canadaCities && locations.usaCities) {
    const { canadaCities, usaCities } = locations;
    allCities = [
      ...Object.values(canadaCities),
      ...Object.values(usaCities),
    ];
  }

  return (
    <div>
      <ul className="flex flex-wrap w-full p-4">
        {allCities &&
          allCities.map((city) => <RadioLocationItem key={city} city={city} />)}
      </ul>
    </div>
  );
}

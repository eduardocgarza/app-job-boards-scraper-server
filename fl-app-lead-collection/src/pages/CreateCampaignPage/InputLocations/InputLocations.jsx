import React from "react";
import useAppContext from "state/AppContext";
import RadioLocationItem from "./RadioLocationItem";

export default function InputLocations() {
  const appContext = useAppContext();
  const { locations } = appContext;
  const { canadaCities, usaCities } = locations;
  const allCities = [
    ...Object.values(canadaCities),
    ...Object.values(usaCities),
  ];

  return (
    <div>
      <ul className="flex flex-wrap w-full p-4">
        {allCities.map((city) => (
          <RadioLocationItem key={city} city={city} />
        ))}
      </ul>
    </div>
  );
}

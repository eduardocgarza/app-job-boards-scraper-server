import React from "react";
import useAppContext from "state/AppContext";
import CheckboxPlatformItem from "./CheckboxPlatformItem";

export default function InputPlatforms() {
  const appContext = useAppContext();
  // const { platforms } = appContext
  const platforms = ["Linkedin", "Facebook", "Twitter", "Instagram"];

  return (
    <div>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        {platforms &&
          platforms.map((platform) => (
            <CheckboxPlatformItem key={platform} platform={platform} />
          ))}
      </ul>
    </div>
  );
}

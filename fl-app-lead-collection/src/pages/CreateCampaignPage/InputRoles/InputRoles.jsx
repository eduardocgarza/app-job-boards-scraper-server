import React from "react";
import useAppContext from "state/AppContext";
import CheckboxRoleItem from "./CheckboxRoleItem";

export default function InputRoles() {
  const appContext = useAppContext();
  const { roles } = appContext;

  return (
    <div>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        {roles &&
          roles.map((role) => <CheckboxRoleItem key={role} role={role} />)}
      </ul>
    </div>
  );
}

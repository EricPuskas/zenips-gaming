import React from "react";
const rolesArray = [
  {
    id: 6,
    role: "Marketing"
  },
  {
    id: 1,
    role: "Lead Developer"
  },
  {
    id: 2,
    role: "Lead Editor"
  },
  {
    id: 3,
    role: "Developer"
  },
  {
    id: 4,
    role: "Editor"
  },
  {
    id: 5,
    role: "Lead Marketing"
  }
];

const roles = rolesArray.map(role => (
  <option key={role.id} value={role.role}>
    {role.role}
  </option>
));

export default roles;

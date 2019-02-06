import React from "react";
const statusArray = [
  {
    id: 21312,
    value: "Private"
  },
  {
    id: 124124,
    value: "Public"
  }
];

const status = statusArray.map(status => (
  <option key={status.id} value={status.value}>
    {status.value}
  </option>
));

export default status;

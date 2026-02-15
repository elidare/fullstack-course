import React from "react";

const Total = ({ exercises }: { exercises: number }): React.JSX.Element => (
  <p>Number of exercises {exercises}</p>
);

export default Total;

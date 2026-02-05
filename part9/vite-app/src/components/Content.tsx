import React from "react";
import Part from "./Part";
import type { CoursePart } from "../../types";

const Content = ({ parts }: { parts: CoursePart[] }): React.JSX.Element => {
  return (
    <div>
      {parts.map((p) => (
        <Part part={p} />
      ))}
    </div>
  );
};

export default Content;

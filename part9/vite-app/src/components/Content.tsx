import React from "react";

type Part = {
  name: string;
  exerciseCount: number;
};

const Content = ({ parts }: { parts: Part[] }): React.JSX.Element => {
  return (
    <div>
      {parts.map((p) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;

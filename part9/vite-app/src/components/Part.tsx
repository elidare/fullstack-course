import React from "react";
import type { CoursePart } from "../../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: { part: CoursePart }): React.JSX.Element => {
  let content: React.JSX.Element = <></>;

  switch (part.kind) {
    case "basic":
      content = (
        <p key={part.name}>
          <div>
            <b>
              {part.name}&nbsp;{part.exerciseCount}
            </b>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
        </p>
      );
      break;
    case "group":
      content = (
        <p key={part.name}>
          <div>
            <b>
              {part.name}&nbsp;{part.exerciseCount}
            </b>
          </div>
          <div>Project exercises {part.groupProjectCount}</div>
        </p>
      );
      break;
    case "background":
      content = (
        <p key={part.name}>
          <div>
            <b>
              {part.name}&nbsp;{part.exerciseCount}
            </b>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>Submit to {part.backgroundMaterial}</div>
        </p>
      );
      break;
    case "special":
      content = (
        <p key={part.name}>
          <div>
            <b>
              {part.name}&nbsp;{part.exerciseCount}
            </b>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>Required skills: {part.requirements.join(", ")}</div>
        </p>
      );
      break;
    default:
      return assertNever(part);
  }

  return content;
};

export default Part;

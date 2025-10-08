import React from "react";

const SkeletonTable = ({ rows = 5, columns = 8 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j}>
              <div className="placeholder-glow">
                <span className="placeholder placeholder-light col-12"></span>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SkeletonTable;

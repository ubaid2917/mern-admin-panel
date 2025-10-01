import React from "react";


const SkeletonTable = ({ rows = 5 }) => {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: 8 }).map((_, j) => (
            <td key={j}>
              <div className="placeholder-glow">
                <span className="placeholder placeholder-light col-8"></span>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonTable;

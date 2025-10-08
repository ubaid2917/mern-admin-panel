import React from "react";

const Table = ({ headers , data, renderRow }) => { 
  return (
    <div style={{ overflowY: "auto", maxHeight: "900px" }}>
      <table className="table table-hover text-center">
        <thead
          className="table-dark"
          style={{ position: "sticky", top: "0", zIndex: 1 }}
        >
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center text-muted">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

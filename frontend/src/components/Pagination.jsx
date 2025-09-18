import React, { useState } from "react";

const Pagination = ({ onChange }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      onChange({ page: page - 1, limit });
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
    onChange({ page: page + 1, limit });
  };

  const handleLimit = (event) => {
    const value = parseInt(event.target.value);
    setLimit(value);
    setPage(1); // ✅ limit change pe page reset
    onChange({ page: 1, limit: value });
  };

  return (
    <div className="row mt-3 align-items-center">
      {/* Rows per page center */}
      <div className="col-12 col-md-6 d-flex justify-content-center">
        <div className="d-flex align-items-center gap-2">
          <p className="mb-0">Rows per page</p>
          <select
            name="limit"
            onChange={handleLimit}
            value={limit}
            className="form-select text-center"
            style={{ width: "100px" }}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
      </div>

      {/* Pagination right */}
      <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={handlePrevPage}
                disabled={page === 1}
                style={{ color: "#212529" }}
              >
                Previous
              </button>
            </li>

            <li className="page-item disabled">
              <span className="page-link">Page {page}</span>
            </li>

            <li className="page-item">
              <button
                className="page-link"
                onClick={handleNextPage}
                style={{ color: "#212529" }}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;

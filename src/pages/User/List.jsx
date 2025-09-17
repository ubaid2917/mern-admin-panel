import React from "react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { deleteUser, getUserList } from "../../API/user";
import Message from "../../components/Message";

const List = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  console.log("page", page)

  useEffect(() => {
    getUser();
  }, [search, limit, page]);

  // get user
  const getUser = async () => {
    try {
      const response = await getUserList(search, limit, page);

      if (response.statusCode !== 200) {
      }
      setData(response?.data?.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // handle delete
  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (confirmDelete) {
        const response = await deleteUser(id);
        if (response.data.success !== false) {
          setMessage("Record Deleted Successfully");
          // alert("User deleted successfully");
          getUser();
        }
      }
    } catch (error) {
      alert("Something went wrong")
    }
  }

  // handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const handleLimit = (event) => {
    const value = event.target.value;
    setLimit(value)
  }
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }
  const handleNextPage = () => {
    setPage(page + 1)
  }

  return (
    <>
      <Message message={message} />
      <div className=" mt-4">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-4">User List</h2>
          </div>
          <div>
            <Link to={"/users/add"} className="btn" style={{ background: '#212529', color: '#fff' }}>
              Add User
            </Link>
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="mb-4 d-flex justify-content-end float-end" style={{ width: "300px" }}>

              <input type="search" className="form-control" value={search} onChange={handleSearch} placeholder="Search" />
            </div>
            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data && data.length > 0 ? (
                  data.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email || "N/A"}</td>
                      <td>{user.phone || "N/A"} </td>
                      <td>{user.country || "N/A"}</td>
                      <td>{new Date(user.created).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}</td>

                      <td>
                        <Link
                          to={`/users/edit/${user.id}`}
                          className="btn btn-sm " style={{ background: '#212529', color: '#fff' }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="btn btn-sm btn-danger ms-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>



            </table>
            <div className="row mt-3 align-items-center">
              {/* Rows per page center me */}
              <div className="col-12 col-md-6 d-flex justify-content-center">
                <div className="d-flex align-items-center gap-2">
                  <p className="mb-0">Rows per page</p>
                  <select
                    name="limit"
                    onChange={handleLimit}
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

              {/* Pagination right corner pe */}
              <div className="col-12 col-md-6 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={handlePrevPage}
                        disabled={page === 1} 
                        style={{ color: '#212529', }}
                      >
                        Previous
                      </button>
                    </li>

                    <li className="page-item disabled">
                      <span className="page-link">Page {page}</span>
                    </li>

                    <li className="page-item">
                      <button className="page-link" onClick={handleNextPage} style={{ color: '#212529',  }}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>

  );
};

export default List;

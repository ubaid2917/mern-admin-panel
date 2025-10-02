import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteUser, getUserList } from "../../API/user";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import SkeletonTable from "../../components/skeletonTable";

const List = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // get user
  const getUser = async ({ page, limit }) => {
    try {
      setLoading(true);
      const response = await getUserList(search, limit, page);
      if (response.status !== 200) return;
      setData(response?.data?.data);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
          getUser({ page: 1, limit: 10 });
        }
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  // handle search input
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // debounce effect for search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getUser({ page: 1, limit: 10 });
    }, 500); // wait 500ms after typing stops

    return () => clearTimeout(delayDebounce); // cleanup
  }, [search]);

  // initial fetch (when page loads)
  useEffect(() => {
    getUser({ page: 1, limit: 10 });
  }, []);

  return (
    <>
      <Message message={message} />
      <div className="mt-1">
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
              <input
                type="search"
                className="form-control"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
              />
            </div>

            {/* Table */}
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
              {loading ? (
                <SkeletonTable rows={10} />
              ) : (
                <tbody>
                  {data?.length > 0 ? (
                    data.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name || "N/A"}</td>
                        <td>{user.email || "N/A"}</td>
                        <td>{user.phone || "N/A"}</td>
                        <td>{user.country || "N/A"}</td>
                        <td>
                          {new Date(user.created).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>
                          {user.isDead === true ? (
                            <button
                              className="btn btn-sm"
                              style={{
                                background: '#ccc',
                                color: "#666",
                                cursor: 'not-allowed',
                              }}
                              disabled
                            >
                              Edit
                            </button>
                          ) : (
                            <Link
                              to={`/users/edit/${user.id}`}
                              className="btn btn-sm"
                              style={{ background: '#212529', color: '#fff' }}
                            >
                              Edit
                            </Link>
                          )}
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
              )}
            </table>

            {/* Pagination */}
            <Pagination onChange={getUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default List;

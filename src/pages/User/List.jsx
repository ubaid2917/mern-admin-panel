import React from "react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { deleteUser, getUserList } from "../../API/user";
import Message from "../../components/Message";

const List = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const response = await getUserList();

      if (response.statusCode !== 200) {
      }
      setData(response?.data?.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

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

  return (
    <>
      <Message message={message} />
      <div className=" mt-4">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-4">User List</h2>
          </div>
          <div>
            <Link to={"/users/add"} className="btn btn-secondary">
              Add User
            </Link>
          </div>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
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
                          className="btn btn-sm btn-secondary"
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
          </div>
        </div>
      </div>
    </>

  );
};

export default List;

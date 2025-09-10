import React from "react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { getUserList } from "../../API/user";

const List = () => {
  const [data, setData] = useState([]);

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

  return (
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
              {data.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "N/A"} </td>
                  <td>{user.country}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <Link
                      to={`/users/edit/${user.id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      Edit
                    </Link>
                    <button className="btn btn-sm btn-danger ms-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;

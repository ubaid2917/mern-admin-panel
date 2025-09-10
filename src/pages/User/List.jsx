import React from 'react'
import { Link } from 'react-router';

const List = () => {
  const users = [
    {
      id: 1,
      name: "Ubaid",
      email: "ubaid29170@gmail.com",
      phone: "123456789",
      createdAt: "2025/09/09",
    },
    {
      id: 2,
      name: "Ali",
      email: "ali@example.com",
      phone: "987654321",
      createdAt: "2025/09/09",
    },
    {
      id: 3,
      name: "Ahmed",
      email: "ahmed@example.com",
      phone: "111222333",
      createdAt: "2025/09/09",
    }
  ];

  return (
    <div className=" mt-4">
      <div className='d-flex justify-content-between'>
          <div>
             <h2 className="mb-4">User List</h2>
          </div>
          <div>
            <Link to={'/users/add'} className='btn btn-secondary'>Add User</Link>
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
                <th>Created At</th>
                <th>Action</th>
              </tr> 
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <Link to={`/users/edit/${user.id}`} className="btn btn-sm btn-secondary">Edit</Link>
                    <button className="btn btn-sm btn-danger ms-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default List

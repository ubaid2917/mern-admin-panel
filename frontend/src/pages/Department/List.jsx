import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRec, getDepartmentList } from "../../API/Department";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import { useToast } from "../../components/ToastProvider";

const DepartmentList = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();

  // get user
  const getDepartment = async ({ page, limit }) => {
    try {
      const response = await getDepartmentList(search, limit, page);
      if (response.status !== 200) return;
      setData(response?.data?.data);

    } catch (error) {
       showToast("Something Went Wrong",  "error");
    }
  };

  // handle delete
  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this data?");
      if (confirmDelete) {
        const response = await deleteRec(id);
        if (response.data.success !== false) {
          showToast(response?.data?.message, "success");
          getDepartment({ page: 1, limit: 10 });
        }
      }
    } catch (error) {
       showToast("Something Went Wrong",  "error");
    }
  };

  // handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    getDepartment({ page: 1, limit: 10 });
  };

  // search
  useEffect(() => {
    getDepartment({ page: 1, limit: 10 });
  }, [search]);

  return (
    <>
      <Message message={message} />
      <div className="mt-1">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-4">Department List</h2>
          </div>
          <div>
            <Link to={"/departments/add"} className="btn" style={{ background: '#212529', color: '#fff' }}> Add Department </Link>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="mb-4 d-flex justify-content-end float-end" style={{ width: "300px" }}>
              <input type="search" className="form-control" value={search} onChange={handleSearch} placeholder="Search" />
            </div>

            {/* Table */}
            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                 
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data.map((data, index) => (
                    <tr key={data.id} className="align-middle">
                      <td >{index + 1}</td>
                      <td>{data.name || "N/A"}</td>
                      <td>{data.description || "N/A"}</td>
                     
                      <td>
                        {new Date(data.created).toLocaleString("en-US", {
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
                        {data.isDead ? (
                          <button
                            className="btn btn-sm"
                            style={{ background: '#ccc', color: '#666',  }}
                            disabled
                           
                          >
                            Edit
                          </button>
                        ) : (
                          <Link
                            to={`/patients/edit/${data.id}`}
                            className="btn btn-sm"
                            style={{ background: '#212529', color: '#fff' }}
                          >
                            Edit
                          </Link>
                        )}

                        <button
                          onClick={() => handleDeleteUser(data.id)}
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

            {/* ✅ Pagination child */}
            <Pagination onChange={getDepartment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRec, getPatientList } from "../../API/patients";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import { useToast } from "../../components/ToastProvider"; 
import SkeletonTable from "../../components/skeletonTable";




const PatientList = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
   const { showToast } = useToast();
   const [loading, setLoading] = useState(false);

  // get user
  const getPatient = async ({ page, limit }) => {
    try { 
      setLoading(true)
      const response = await getPatientList(search, limit, page);

      if (response.status !== 200) return;
      setData(response?.data?.data);

    } catch (error) {
     showToast("Something Went Wrong",  "error");
    }finally{
      setLoading(false)
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
          getPatient({ page: 1, limit: 10 });
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
    getPatient();
  };

  // search
  useEffect(() => {
    getPatient({ page: 1, limit: 10 });
  }, [search]);

  return (
    <>
      <Message message={message} />
      <div className="mt-1">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-4">Patient List</h2>
          </div>
          <div>
            <Link to={"/patients/add"} className="btn" style={{ background: '#212529', color: '#fff' }}> Add Patient </Link>
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
                  <th>Patient Name</th>
                  <th>Father Name</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Phone</th>
                  <th>Dead</th>
                  <th>Pic</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
               {loading ? (
                <SkeletonTable rows={6} />
              ) : (
              <tbody>
                {data?.length > 0 ? (
                  data.map((user, index) => (
                    <tr key={user.id} className="align-middle">
                      <td >{index + 1}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.fatherName || "N/A"}</td>
                      <td>{user.gender || "N/A"}</td>
                      <td>{user.bloodGroup || "N/A"}</td>
                      <td>{user.phone || "N/A"}</td>
                      <td>{user.isDead === true ? "Yes" : user.isDead === false ? "No" : "N/A"}</td>
                      <td >
                        <img style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }} src={user.pic} alt="" />
                      </td>
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
                        {user.isDead ? (
                          <button
                            className="btn btn-sm"
                            style={{ background: '#ccc', color: '#666',  }}
                            disabled
                           
                          >
                            Edit
                          </button>
                        ) : (
                          <Link
                            to={`/patients/edit/${user.id}`}
                            className="btn btn-sm"
                            style={{ background: '#212529', color: '#fff' }}
                          >
                            Edit
                          </Link>
                        )}

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
              )}
            </table>

            {/* ✅ Pagination child */}
            <Pagination onChange={getPatient} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRec, getList } from "../../API/doctor";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import { useToast } from "../../components/ToastProvider";
import DeleteModel from "../../components/DeleteModel"; 
import SkeletonTable from "../../components/skeletonTable";
const DoctorList = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const { showToast } = useToast();
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);  

  // get user
  const getDoctor = async ({ page, limit }) => {
    try {
      setLoading(true);
      const response = await getList(search, limit, page);
      if (response.status !== 200) return;
      setData(response?.data?.data);

    } catch (error) {
      showToast("Something Went Wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // handle delete
  const handleDeleteUser = async (id) => {
    try {
      setLoading(true)
      const response = await deleteRec(id);
      if (response.data.success !== false) {
        showToast(response?.data?.message, "success");
        getDoctor({ page: 1, limit: 10 });
      }

    } catch (error) {
      showToast("Something Went Wrong", "error");
    }finally{
      setLoading(false)
    }
  };

  // handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  // search
  useEffect(() => {  
    const delayDebounce = setTimeout(() => {
      
      getDoctor({ page: 1, limit: 50 });
    }, 500)  

    return () => clearTimeout(delayDebounce)
  }, [search]);
   

  // initial render 
  useEffect(() => {
    getDoctor({ page: 1, limit: 50 });
  }, []);
  return (
    <>


      <div className="mt-1">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-4">Doctor List</h2>
          </div>
          <div>
            <Link to={"/doctors/add"} className="btn" style={{ background: '#212529', color: '#fff' }}> Add Doctor </Link>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="mb-4 d-flex justify-content-end float-end" style={{ width: "300px" }}>
              <input type="search" className="form-control" value={search} onChange={handleSearch} placeholder="Search" />
            </div>

            {/* Table */}
            <div style={{ height:"68vh",width:"87vw",overflowY: "auto" ,}}>
            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>Appointment Charges</th>
                  <th>Daily patient Check</th>
                  <th>Department</th>

                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
               {loading ? (
                <SkeletonTable rows={10} />
              ) : (
              <tbody>
                {data?.length > 0 ? (
                  data.map((data, index) => (
                    <tr key={data.id} className="align-middle">
                      <td >{index + 1}</td>
                      <td>{data.name || "N/A"}</td>
                      <td>{data.email || "N/A"}</td>
                      <td>{data.phone || "N/A"}</td>
                      <td>{data.appointmentCharges || "N/A"}</td>
                      <td>{data.dailyPatient || "N/A"}</td>
                      <td>{data.department.name || "N/A"}</td>

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
                            style={{ background: '#ccc', color: '#666', }}
                            disabled

                          >
                            Edit
                          </button>
                        ) : (
                          <Link
                            to={`/doctors/edit/${data.id}`}
                            className="btn btn-sm"
                            style={{ background: '#212529', color: '#fff' }}
                          >
                            Edit
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => setDeleteId(data.id)}
                          className="btn btn-sm btn-danger ms-2"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
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
            </div>

            {/* ✅ Pagination child */}
            <div>

            
             <div style={{  bottom: "30px", backgroundColor: "#fff", width: '100%' }}>

            <Pagination onChange={getDoctor} />
            </div>

            {/* Pagination */} 
            
          </div>
          </div>
        </div>
      </div>
      <DeleteModel deleteId={deleteId} handleDelete={handleDeleteUser} />
    </>
  );
};

export default DoctorList;

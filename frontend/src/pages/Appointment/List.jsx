import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRec, getPatientList } from "../../API/patients";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";

const AppointmentList = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOPD, setSelectedOPD] = useState("today");

  // get user
  const getPatient = async ({ page, limit }) => {
    try {
      const response = await getPatientList(search, limit, page);

      console.log('response', response)
      if (response.status !== 200) return;
      setData(response?.data?.data);

    } catch (error) {
      alert("Something went wrong");
    }
  };

  // handle delete
  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this data?");
      if (confirmDelete) {
        const response = await deleteRec(id);
        if (response.data.success !== false) {
          setMessage("Record Deleted Successfully");
          getPatient({ page: 1, limit: 10 });
        }
      }
    } catch (error) {
      alert("Something went wrong")
    }
  };

  // handle search
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    getPatient();
  };
  // handle click on tab
  const handleClick = (value) => {
    setSelectedOPD(value);
    console.log("Selected:", value);
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
            <h2 className="mb-4">Appointment List</h2>
          </div>
          <div>
            <Link to={"/appointments/add"} className="btn" style={{ background: '#212529', color: '#fff' }}> Add Appointment </Link>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center ">


              <div className="d-flex gap-3 align-items-center">
                {["today", "coming", "old"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleClick(item)}
                    className="btn btn-link px-3"
                    style={{
                      textDecoration: "none",
                      fontSize: "20px",
                      color: selectedOPD === item ? "#000" : "#555",
                      borderBottom: selectedOPD === item ? "2px solid #000" : "2px solid transparent",
                      borderRadius: 0,
                    }}
                  >
                    {item === "today"
                      ? "Today OPD"
                      : item === "coming"
                        ? "Coming OPD"
                        : "Old OPD"}
                  </button>
                ))}
              </div>

              <div className="mb-4 d-flex justify-content-end float-end align-items-center" style={{ width: "300px" }}>
                <input type="search" className="form-control" value={search} onChange={handleSearch} placeholder="Search" />
              </div>
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
                        })}PatientList
                      </td>
                      <td>
                        {user.isDead ? (
                          <button
                            className="btn btn-sm"
                            style={{ background: '#ccc', color: '#666', }}
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
            </table>

            {/* ✅ Pagination child */}
            <Pagination onChange={getPatient} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;

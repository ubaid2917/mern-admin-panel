import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRec, getList } from "../../API/appointment";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const AppointmentList = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOPD, setSelectedOPD] = useState("today");

  const getAppointmentList = async ({ page, limit }) => {
    try {
      const response = await getList(search, limit, page);  

      if (response.status !== 200) return;
      setData(response?.data?.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };  

  console.log("data", data);

  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this data?");
      if (confirmDelete) {
        const response = await deleteRec(id);
        if (response.data.success !== false) {
          setMessage("Record Deleted Successfully");
          getAppointmentList({ page: 1, limit: 50 });
        }
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = (value) => setSelectedOPD(value);

  // ✅ Initial load
  useEffect(() => {
    getAppointmentList({ page: 1, limit: 50 });
  }, []);

  // ✅ Search with debounce - triggers API call when search changes
  useEffect(() => {
    const timer = setTimeout(() => {
      getAppointmentList({ page: 1, limit: 50 });
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer); // Cleanup
  }, [search]); // Runs whenever search state changes

  // ✅ define table headers
  const headers = [
    "#",
    "Patient",
    "Fees",
    "date",
    "Blood Group",
    "Phone",
    "Dead",
    "Created At",
    "Action",
  ];

  // ✅ define how each row is rendered
  const renderRow = (data, index) => (
    <tr key={data.id} className="align-middle">
      <td>{index + 1}</td>
      <td>{data.fees || "N/A"}</td>
      <td>{data.fatherName || "N/A"}</td>
      <td>{data.gender || "N/A"}</td>
      <td>{data.bloodGroup || "N/A"}</td>
      <td>{data.phone || "N/A"}</td>
      <td>{data.isDead ? "Yes" : "No"}</td>
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
          <button className="btn btn-sm" style={{ background: "#ccc", color: "#666" }} disabled>
            Edit
          </button>
        ) : (
          <Link
            to={`/patients/edit/${data.id}`}
            className="btn btn-sm"
            style={{ background: "#212529", color: "#fff" }}
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
  );

  return (
    <>
      <Message message={message} />
      <div className="mt-1">
        <div className="d-flex justify-content-between">
          <h2 className="mb-4">Appointment List</h2>
          <Link to="/appointments/add" className="btn" style={{ background: "#212529", color: "#fff" }}>
            Add Appointment
          </Link>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {/* Tabs + Search */}
            <div className="d-flex justify-content-between align-items-center">
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

              <div className="mb-4" style={{ width: "300px" }}>
                <input
                  type="search"
                  className="form-control"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search"
                />
              </div>
            </div>

            {/* ✅ Reusable Table */}
            <Table headers={headers} data={data} renderRow={renderRow} />

            {/* Pagination */}
            <div style={{ bottom: "30px", backgroundColor: "#fff", width: "100%" }}>
              <Pagination onChange={getAppointmentList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
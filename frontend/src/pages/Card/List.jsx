import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteRec, getList } from "../../API/card";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const getCardList = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const getCardList = async ({ page, limit }) => {
    try {
      setLoading(true);
      const response = await getList(search, limit, page);

      if (response.status !== 200) return;
      setData(response?.data?.data);
    } catch (error) {
      alert("Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this data?");
      if (confirmDelete) {
        const response = await deleteRec(id);
        if (response.data.success !== false) {
          setMessage("Record Deleted Successfully");
          getCardList({ page: 1, limit: 50 });
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

  //  Initial load
  useEffect(() => {
    getCardList({ page: 1, limit: 50 });
  }, []);

  // Search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      getCardList({ page: 1, limit: 50 });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);



  //  define table headers
  const headers = [
    "#",
    "name",
    "minVisits",
    "discount %",
    "type",
    "validity",
    "description",
    "Created At",
    "Action",
  ];

  //  define how each row is rendered
  const renderRow = (data, index) => (
    <tr key={data.id} className="align-middle">
      <td>{index + 1}</td>
      <td>{data.name || "N/A"}</td>
      <td>{data.minVisits || "N/A"}</td>
      <td>{data.discount || "N/A"}</td>
      <td>{data.type || "N/A"}</td>
      <td>{data.validity || "N/A"}</td>
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
          <button className="btn btn-sm" style={{ background: "#ccc", color: "#666" }} disabled>
            Edit
          </button>
        ) : (
          <Link
            to={`/cards/edit/${data.id}`}
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
      <div className="">
        <div className="d-flex justify-content-between">
          <div>

            <h2 className="mb-4">Card List</h2>
          </div>
          <div>
            <Link to="/cards/add" className="btn" style={{ background: "#212529", color: "#fff" }}>
              Add Card
            </Link>
          </div>

        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            {/* Tabs + Search */}
            <div style={{ marginBottom: "40px" }}>
              <div className="mb-3" style={{ width: "300px", float: "right"  }}>
                <input
                  type="search"
                  className="form-control"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search"
                />
              </div>  
            </div> 
  <br />


            {/* ✅ Reusable Table */}
            <Table headers={headers} data={data} renderRow={renderRow} loading={loading} />

            {/* Pagination */}
            <div style={{ bottom: "30px", backgroundColor: "#fff", width: "100%" }}>
              <Pagination onChange={getCardList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default getCardList;
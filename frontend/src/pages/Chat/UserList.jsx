import React, { useEffect, useState } from "react";
import { getUserList } from "../../API/user";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatLayout = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUserList("", 100, 1);
      if (response.status !== 200) return;
      setUsers(response?.data?.data);
      console.log("fetching users", response);
    };
    fetchUsers();
  }, []);

  return (
    <div className="container-fluid" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="row h-100">
        {/* ===== Sidebar ===== */}
        <div
          className="col-md-3 col-lg-3 col-sm-4 col-12 border-end"
          style={{
            backgroundColor: "#f8f9fa",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <h5 className="text-center py-3 border-bottom bg-white">Users</h5>

          {users.length === 0 ? (
            <p className="text-center text-muted mt-4">No users found</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className={`p-3 border-bottom user-item ${
                  selectedUser?.id === user.id ? "bg-light" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedUser(user)}
              >
                <strong>{user.name}</strong>
                <br />
                <small className="text-muted">{user.email}</small>
              </div>
            ))
          )}
        </div>

        {/* ===== Chat Container ===== */}
        <div className="col-md-9 col-lg-9 col-sm-8 col-12 d-flex flex-column p-0">
          {selectedUser ? (
            <div className="d-flex flex-column h-100">
              {/* Header */}
              <div className="bg-light p-3 border-bottom">
                <h5 className="m-0">{selectedUser.name}</h5>
                <small className="text-muted">{selectedUser.email}</small>
              </div>

              {/* Chat messages area */}
              <div
                className="flex-grow-1 p-3"
                style={{
                  overflowY: "auto",
                  backgroundColor: "#fdfdfd",
                }}
              >
                <p className="text-center text-muted">
                  👋 Start chatting with {selectedUser.name}
                </p>
              </div>

              {/* Message input */}
              <div className="p-3 border-top bg-white">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                  />
                  <button className="btn btn-primary" type="button">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
              <h5>Select a user to start chat 💬</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;

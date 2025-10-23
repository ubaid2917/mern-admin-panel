import React, { useEffect, useState, useRef } from "react";
import { getUserList } from "../../API/user";

const ChatLayout = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");

    const debounceTimeout = useRef(null);

    const fetchUsers = async (searchText = "") => {
        try {
            const response = await getUserList(searchText, 100, 1);
            if (response.status === 200) {
                setUsers(response?.data?.data);
            }
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchUsers();
    }, []);

    // Debounced search effect
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            fetchUsers(search);
        }, 500); // 500ms debounce

        return () => clearTimeout(debounceTimeout.current);
    }, [search]);

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

                    {/* Search input */}
                    <div className="input-group p-3 border-bottom">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

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
                <div 
                    className="col-md-9 col-lg-9 col-sm-8 col-12 p-0" 
                    style={{ 
                        height: "100%",
                        position: "relative"
                    }}
                >
                    {selectedUser ? (
                        <>
                            {/* Header */}
                            <div 
                                className="bg-light p-3 border-bottom"
                            >
                                <h5 className="m-0">{selectedUser.name}</h5>
                                <small className="text-muted">{selectedUser.email}</small>
                            </div>

                            {/* Messages area */}
                            <div 
                                className="p-3" 
                                style={{ 
                                    backgroundColor: "#fdfdfd",
                                    height: "calc(100% - 140px)",
                                    overflowY: "auto"
                                }}
                            >
                                <p className="text-center text-muted">
                                    👋 Start chatting with {selectedUser.name}
                                </p>
                                {/* Messages will go here */}
                            </div>

                            {/* Input at bottom - FIXED POSITION */}
                            <div 
                                className="p-3 border-top" 
                                style={{ 
                                    width: "73rem",
                                    position: "fixed",
                                    bottom: "2%",
                                    left: "37%",
                                    // right: "10%",
                                    zIndex: 10
                                }}
                            >
                                <div className="input-group">
                                    <input style={{
                                        borderTopLeftRadius: "10px",
                                        borderBottomLeftRadius: "10px",
                                        
                                        padding: "20px 20px",
                                        border: "1px solid #ced4da",
                                        outline: "none",
                                    }}
                                        type="text"
                                        className="form-control"
                                        placeholder="Type a message..."
                                    />
                                    <button  style={{
                                        borderTopRightRadius: "10px",
                                        borderBottomRightRadius: "10px",
                                        padding: "10px 20px",
                                    }} className="btn btn-primary" type="button">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </>
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
import React, { useEffect, useState, useRef } from "react";
import { getUserList } from "../../API/user";
import { addRecord, getList, seenMessage } from "../../API/chat";
import { getSocket } from "../../socket/Socket";

const ChatLayout = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage, ] = useState("");

  const debounceTimeout = useRef(null);
  const messagesContainerRef = useRef(null);
  const socket = getSocket();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.id;

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  //  Socket listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("messageReceived", async ({ newMessage }) => {
  if (
    selectedUser &&
    (newMessage.senderId === selectedUser.id ||
      newMessage.receiverId === selectedUser.id)
  ) {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === newMessage.id);
      return exists ? prev : [...prev, newMessage];
    });

    //If receiver currently viewing this chat — mark message as read instantly
    if (newMessage.receiverId === loggedInUserId) {
      try {
        await seenMessage({ chatId: newMessage.chatId });
      } catch (err) {
        console.error("Failed to mark message as read in real-time", err);
      }
    }
  }
});


    socket.on("messageSent", ({ newMessage }) => {
      if (
        selectedUser &&
        (newMessage.senderId === selectedUser.id ||
          newMessage.receiverId === selectedUser.id)
      ) {
        setMessages((prev) => {
          const exists = prev.some((m) => m.id === newMessage.id);
          return exists ? prev : [...prev, newMessage];
        });
      }
    });

    // Listen when messages marked as read
    socket.on("messagesRead", ({ chatId, userId }) => {
      // Update local messages
      setMessages((prev) =>
        prev.map((msg) =>
          msg.receiverId === userId ? { ...msg, isRead: true } : msg
        )
      );
    });

    return () => {
      socket.off("messageReceived");
      socket.off("messageSent");
      socket.off("messagesRead");
    };
  }, [socket, selectedUser]);

  const fetchUsers = async (searchText = "") => {
    try {
      const response = await getUserList(searchText, 100, 1);
      if (response.status === 200) setUsers(response?.data?.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => fetchUsers(search), 500);
    return () => clearTimeout(debounceTimeout.current);
  }, [search]);

  //  Fetch chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser) return;
      try {
        const res = await getList(selectedUser.id);
        if (res.status === 200) {
          const cleanMessages = (res.data?.data?.messages || []).filter(Boolean);
          setMessages(cleanMessages);

          // Mark all messages as read when opening chat
          if (socket && cleanMessages.length > 0) {
             const chatId = cleanMessages[0]?.chatId;  

             console.log("chatId", chatId)
              await seenMessage({ chatId });
          }
        }
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  //  Send message
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const payload = {
        receiverId: selectedUser.id,
        message: newMessage,
        type: "text",
      };

      const res = await addRecord(payload);
      if (res.status === 201 && res.data?.data?.newMessage) {
        const newMsg = res.data.data.newMessage;
        setMessages((prev) => {
          const exists = prev.some((m) => m.id === newMsg.id);
          return exists ? prev : [...prev, newMsg];
        });
      }

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="container-fluid" style={{ height: "90vh", overflow: "hidden" }}>
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

          {/* Search */}
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

        {/* ===== Chat Area ===== */}
        <div
          className="col-md-9 col-lg-9 col-sm-8 col-12 p-0"
          style={{
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectedUser ? (
            <>
              {/* Header */}
              <div className="bg-light p-3 border-bottom" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <h5 className="m-0">{selectedUser.name}</h5>
                <small className="text-muted">{selectedUser.email}</small>
              </div>

              {/* Messages */}
              <div ref={messagesContainerRef} className="flex-grow-1 p-3" style={{ backgroundColor: "#fdfdfd", overflowY: "auto" }}>
                {messages.length === 0 ? (
                  <p className="text-center text-muted">
                    👋 Start chatting with {selectedUser.name}
                  </p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 d-flex ${
                        msg.senderId === loggedInUserId
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div style={{ maxWidth: "70%" }}>
                        <div
                          style={{
                            backgroundColor:
                              msg.senderId === loggedInUserId
                                ? "#007bff"
                                : "#e9ecef",
                            color:
                              msg.senderId === loggedInUserId
                                ? "white"
                                : "black",
                            padding: "10px 15px",
                            borderRadius: "15px",
                            wordBreak: "break-word",
                          }}
                        >
                          {msg.message}
                        </div>

                        <div
                          style={{
                            fontSize: "11px",
                            color: "#6c757d",
                            marginTop: "4px",
                            textAlign:
                              msg.senderId === loggedInUserId ? "right" : "left",
                          }}
                        >
                          {formatTime(msg.created)}{" "}
                          {msg.senderId === loggedInUserId && (
                            <span
                              style={{
                                color: msg.isRead ? "#0d6efd" : "#adb5bd",
                                marginLeft: "4px",
                              }}
                            >
                              {msg.isRead ? "✅✅" : "✅"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-top bg-white" style={{ position: "sticky", bottom: 0 }}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button className="btn btn-primary" onClick={handleSend}>
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

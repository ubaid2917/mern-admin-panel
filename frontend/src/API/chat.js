import { invokeApi } from "../utils/invokeApi";

// get user
export const getList = async (receiverId) => {
  //  console.log('search')
  const reqObj = {
    path: `/chat/get-messages/${receiverId}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(reqObj);
};

// add record
export const addRecord = async (data) => {   
  const reqObj = {
    path: `/chat/send-message`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
// seen message
export const seenMessage = async (data) => {   
  const reqObj = {
    path: `/chat/mark-as-read`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// get single record
export const getOneRec = async (id) => {
  const reqObj = {
    path: `/chat/get/${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(reqObj);
};

// update record
export const updateOneRec = async (id, data) => {
  console.log("id", id);
  const reqObj = {
    path: `/chat/update/${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// delete record
export const deleteRec = async (data) => {
  const reqObj = {
    path: `/chat/delete/${data}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(reqObj);
};
// bulk delete records
export const bulkDelete = async (data) => {
  const reqObj = {
    path: `/chat/bulk-delete`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData:  data ,
  };
  return invokeApi(reqObj);
};

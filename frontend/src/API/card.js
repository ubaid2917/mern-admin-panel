import { invokeApi } from "../utils/invokeApi";

// get user
export const getList = async (search, limit, page) => {
  //  console.log('search')
  const reqObj = {
    path: `/smartcard/get?search=${search || ""}&limit=${limit}&page=${page}`,
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
    path: `/smartcard/add`,
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
    path: `/smartcard/get/${id}`,
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
    path: `/smartcard/update/${id}`,
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
    path: `/smartcard/delete/${data}`,
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
    path: `/smartcard/bulk-delete`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    postData:  data ,
  };
  return invokeApi(reqObj);
};

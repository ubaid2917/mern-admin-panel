import { invokeApi } from "../utils/invokeApi";

// get user
export const getDepartmentList = async (search, limit, page) => {
  //  console.log('search')
  const reqObj = {
    path: `/department/get?search=${search}&limit=${limit}&page=${page}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(reqObj);
};

// add record
export const addDepartment = async (data) => {
  const reqObj = {
    path: `/department/add`,
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
    path: `/department/get/${id}`,
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
    path: `/department/update/${id}`,
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
    path: `/department/delete/${data}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  return invokeApi(reqObj);
};

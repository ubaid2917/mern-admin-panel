import { invokeApi } from "../utils/invokeApi";

// get user
export const getPatientList = async (search, limit, page) => { 
  //  console.log('search')
  const reqObj = {
    path: `/patient/get?search=${search}&limit=${limit}&page=${page}`,
    method: "GET",
    headers: {},
  };
  return invokeApi(reqObj);
};

// add user
export const addPatient = async (data) => { 
  const reqObj = {
    path: `/patient/add`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data", 
       
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// get single user
export const getOneUser = async (id) => {
  const reqObj = {
    path: `/user/get/${id}`,
    method: "GET",
    headers: {},
  };
  return invokeApi(reqObj);
};

// update user
export const updateOneUser = async (id, data) => {
  console.log("id", id);
  const reqObj = {
    path: `/user/update/${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// delete user
export const deleteUser = async (data) => {
  const reqObj = {
    path: `/user/delete/${data}`,
    method: "DELETE",
  };
  return invokeApi(reqObj);
};

import { invokeApi } from "../utils/invokeApi";

// get user
export const getUserList = async () => {
  const reqObj = {
    path: `/sample/get`,
    method: "GET",
    headers: {},
  };
  return invokeApi(reqObj);
};

// add user
export const addUser = async (data) => {
  const reqObj = {
    path: `/sample/add`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

// get single user
export const getOneUser = async (id) => {
  const reqObj = {
    path: `/sample/get/${id}`,
    method: "GET",
    headers: {},
  };
  return invokeApi(reqObj);
};

// update user
export const updateOneUser = async (id, data) => {
  console.log("id", id);
  const reqObj = {
    path: `/sample/update/${id}`,
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
    path: `/sample/delete/${data}`,
    method: "DELETE",
  };
  return invokeApi(reqObj);
};

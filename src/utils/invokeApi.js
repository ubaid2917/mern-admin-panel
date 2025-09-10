import axios from "axios";
import { baseUrl } from  "../config/config";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function invokeApi({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  postData = {},
}) {
  const reqObj = {
    method,
    url: baseUrl + path,
    headers,
  };

  reqObj.params = queryParams;

  if (method === "POST") {
    reqObj.data = postData;
  }
  if (method === "PATCH") {
    reqObj.data = postData;
  }
  if (method === "PUT") {
    reqObj.data = postData;
  }
  if (method === "DELETE") {
    reqObj.data = postData;
  }

  let results;

  try {
    results = await axios(reqObj);

    return results;
  } catch (error) {
     if (error?.response?.status === 401 ) {
      localStorage.clear();
      window.location.reload();
    }
    if (error.response) {
      // The request was made, and the server responded with a status code outside the 2xx range
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received (network issues, timeout, etc.)
      return { message: "No response received from server." };
    } else {
      // Something else happened while setting up the request
      return { message: "An unknown error occurred." };
    }
  }
}
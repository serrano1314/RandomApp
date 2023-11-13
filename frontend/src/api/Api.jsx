// api.js
import Axios from "./Axios";

const request = async (method, url, data = null, accessToken) => {
  try {
    const response = await Axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

export { request };

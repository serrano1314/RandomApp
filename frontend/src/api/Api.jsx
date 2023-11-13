// Used to make requests to the backend
import Axios from "./Axios";

const request = async (method, url, data = null, accessToken = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    // If an access token is provided, add it to the Authorization header
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const response = await Axios({
      method,
      url,
      data,
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

const login = async (email, password) => {
  try {
    console.log("API LOGIN TRY");
    const response = await request(
      "post",
      "/auth/authenticate",
      {
        email,
        password,
      },
      null
    );
    return response;
  } catch (err) {
    console.log("API LOGIN ERROR");
    console.error(err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

const register = async (firstname, lastname, email, password, role) => {
  try {
    console.log("API REGISTER TRY");
    const response = await request(
      "post",
      "/auth/register",
      {
        firstname,
        lastname,
        email,
        password,
        role,
      },
      null
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("API REGISTER ERROR");
    console.error(err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

const refreshToken = async (refreshToken) => {
  try {
    console.log("API REFRESH TOKEN TRY");
    const response = await request(
      "post",
      "/auth/refresh-token",
      null,
      refreshToken
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log("API REFRESH TOKEN ERROR");
    console.error(err);
    throw err; // Re-throw the error to handle it in the calling function
  }
};

export { request, login, register, refreshToken };

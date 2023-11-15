import Axios from "../api/Axios";
import useAuth from "./useAuth";
import { isExpired } from "react-jwt";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    if (!isExpired(auth.accessToken)) {
      console.log("NOT EXPIRED", auth.accessToken);
      return auth.accessToken;
    }
    console.log("AUTH EXP>>", isExpired(auth.accessToken));
    const token =
      auth.accessToken && !isExpired(auth.accessToken)
        ? auth.accessToken
        : undefined;

    try {
      console.log("TOKEN>>", token);
      const response = await Axios.post("/auth/refresh-token", null, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("RESOOONSE", response);
      setAuth((prev) => {
        console.log(">>>>0", response);
        console.log(
          ">>>>1",
          JSON.stringify(prev.accessToken),
          JSON.stringify(prev.refreshToken)
        );
        console.log(">>>>2", response.data.access_token);
        return {
          ...prev,
          roles: [response.data.role],
          accessToken: response.data.access_token,
        };
      });

      console.log("AUTH>>", auth);
      return response.data.access_token;
    } catch (error) {
      // Handle the error (e.g., token refresh failure)
      console.error("Refresh token error:", error);
      throw error;
    }
  };

  return refresh;
};
export default useRefreshToken;

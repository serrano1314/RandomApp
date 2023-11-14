import Axios from "../api/Axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    console.log("AUTH>>", auth);
    const token = auth.refreshToken; // Replace with the actual property where your refresh token is stored in the auth state

    try {
      console.log("TOKEN>>", token);
      const response = await Axios.post("/auth/refresh-token", null, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
        withCredentials: true,
      });
      console.log("RESOOONSE", response);
      setAuth((prev) => {
        console.log(">>>>0", response);
        console.log(">>>>1", JSON.stringify(prev.accessToken));
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

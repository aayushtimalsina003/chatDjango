import axios from "axios";
import { AuthServiceProps } from "../@types/auth-service";

export function useAuthService(): AuthServiceProps {
  const getUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("access_token");

      console.log(">>>>>>>>");
      console.log(accessToken);

      const response = await axios.get(
        `http://127.0.0.1:8000/api/account/?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userDetails = response.data;
      localStorage.setItem("username", userDetails.username);
    } catch (error: any) {
      return error;
    }
  };

  const getUserIdFromToken = (access: string) => {
    const token = access;
    const tokenParts = token.split(".");
    const encodedPayLoad = tokenParts[1];
    //atob converts ASCII code into binary
    const decodedPayLoad = atob(encodedPayLoad);
    const payLoadData = JSON.parse(decodedPayLoad);
    const userId = payLoadData.user_id;

    return userId;
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      //Saving the access and refresh tokens in local Storage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("userId", getUserIdFromToken(access));

      getUserDetails();
    } catch (err: any) {
      return err;
    }
  };
  return { login };
}

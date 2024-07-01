import axios from "axios";
import { redirect } from "react-router-dom";
import { BACKEND_URL } from "./constant";

const checkAdmin = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      throw "No token found";
    }

    const { data } = await axios.post(
      BACKEND_URL + "/auth/user-info",
      {},
      {
        headers: {
          access_token,
        },
      },
    );

    if (!data.nim) {
      throw "User is not an admin";
    }

    return data;
  } catch (error) {
    console.error(error);
    return redirect("/auth/sign-in"); // Redirect to login if not admin or error occurs
  }
};

export default checkAdmin;

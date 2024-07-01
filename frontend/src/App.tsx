import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { CurrentUserContext, IUser } from "./contexts/CurrentUserContext";

import axios from "axios";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./lib/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  const [user, setUser] = useState<IUser>({
    id: "",
    displayName: "",
    nim: "",
    accessToken: "",
    authType: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await msalInstance.initialize();
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
          const { data } = await axios.post(
            import.meta.env.VITE_BASE_BACKEND_URL + "/auth/user-info",
            {},
            { headers: { access_token: accessToken } },
          );
          setUser({
            id: data._id,
            displayName: data.displayName,
            nim: data.nim,
            accessToken: accessToken,
            authType: data.nim ? "Microsoft" : "",
          });
        } else {
          throw "Not logged in";
        }
      } catch (error) {
        localStorage.setItem("access_token", "");
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <CurrentUserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </CurrentUserContext.Provider>
    </MsalProvider>
  );
};

export default App;

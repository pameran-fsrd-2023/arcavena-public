import {
  useIsAuthenticated as useIsAuthenticatedByMicrosoft,
  useMsal,
} from "@azure/msal-react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { callMsGraph } from "../../lib/graph";
import { loginRequest } from "../../lib/authConfig";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const useCurrentUser = () => {
  const { instance, accounts } = useMsal();
  const { user, setUser } = useContext(CurrentUserContext);
  const isAuthenticatedByMicrosoft = useIsAuthenticatedByMicrosoft();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function RequestProfileDataMicrosoft() {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      const {
        displayName,
        id: microsoftMailId,
        mail: microsoftMail,
      } = await callMsGraph(response.accessToken);

      const { data } = await axios.post(
        import.meta.env.VITE_BASE_BACKEND_URL + "/auth/sign-up",
        {
          displayName,
          microsoftMail,
          microsoftMailId,
        },
      );
      if (setUser) {
        setUser({
          id: data.id,
          displayName,
          accessToken: data.access_token,
          authType: "Microsoft",
        });
      }
    }

    setIsLoading(true);
    try {
      if (isAuthenticatedByMicrosoft) {
        RequestProfileDataMicrosoft();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticatedByMicrosoft]);

  return { user, isLoading };
};
export default useCurrentUser;

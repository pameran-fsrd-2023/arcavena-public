import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
import { TiVendorMicrosoft } from "react-icons/ti";
import axios from "axios";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignInMicrosoftButton = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const { setUser } = useContext(CurrentUserContext);

  const handleLogin = async () => {
    try {
      const { account } = await instance.loginPopup(loginRequest);
      const {
        localAccountId: microsoftMailId,
        name: displayName,
        username: microsoftMail,
      } = account;

      const { data } = await axios.post(
        import.meta.env.VITE_BASE_BACKEND_URL + "/auth/fsrd/sign-in",
        {
          displayName,
          microsoftMail,
          microsoftMailId,
        },
      );

      if (setUser) {
        setUser({
          id: data.id,
          displayName: displayName as string,
          nim: data.nim,
          accessToken: data.access_token,
          authType: "Microsoft",
        });
      }
      localStorage.setItem("access_token", data.access_token);
      navigate(`/profile-fsrd/${microsoftMail.split("@")[0]}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Maaf, login microsoft khusus untuk mahasiswa FSRD angkatan 2023",
      });
    }
  };
  return (
    <button
      onClick={handleLogin}
      type="button"
      className="flex w-full items-center justify-center gap-4 rounded-md bg-gradient-to-br from-white/40 to-white/20 px-4 py-3 hover:to-white/30"
    >
      <TiVendorMicrosoft
        size={25}
        color="white"
        className="scale-150 md:scale-100"
      />
      <p>Microsoft (Khusus Mahasiswa FSRD 2023)</p>
    </button>
  );
};

export default SignInMicrosoftButton;

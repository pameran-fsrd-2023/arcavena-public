import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { IoLogoGoogle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const SignInWithGoogleButton = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(CurrentUserContext);

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BASE_BACKEND_URL + "/auth/g-signin",
          {
            gCode: credentialResponse.code,
          },
        );
        if (setUser) {
          setUser({
            id: data.id,
            displayName: data.displayName as string,
            nim: data.nim,
            accessToken: data.access_token,
            authType: "Google",
          });
        }

        localStorage.setItem("access_token", data.access_token);
        navigate(`/`);
      } catch (error) {
        console.error(error);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => login()}
      type="button"
      className="flex w-full items-center justify-center gap-4 rounded-md bg-gradient-to-br from-white/40 to-white/20 px-4 py-3 hover:to-white/30"
    >
      <IoLogoGoogle
        size={20}
        color="white"
        className="scale-150 md:scale-100"
      />
      <p>Gmail</p>
    </button>
  );
};

export default SignInWithGoogleButton;

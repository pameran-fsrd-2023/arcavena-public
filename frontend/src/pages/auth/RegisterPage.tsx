import { useContext, useState } from "react";
import SignInMicrosoftButton from "../../components/SignInMicrosoftButton";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import SignInWithGoogleButton from "../../components/SignInWithGoogleButton";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { setUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  async function RequestProfileDataPWD(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_BACKEND_URL + "/auth/sign-up",
        {
          username: formData.username,
          password: formData.password,
        },
      );
      if (setUser) {
        setUser({
          id: data.id,
          displayName: data.displayName,
          accessToken: data.access_token,
          authType: "PWD",
        });
        localStorage.setItem("access_token", data.access_token);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Swal.fire({
          icon: "error",
          title: "Gagal Register",
          text: error?.response?.data as string,
        });
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="h-fit min-h-[calc(100vh-5rem)] w-full bg-gradient-to-b from-[#0B014B] to-[#351F74] ">
      <div className="flex h-full w-full flex-col items-center justify-between px-2 pt-20">
        <main className="mx-auto flex h-fit w-full max-w-[600px] flex-col items-center justify-center gap-8 rounded-xl bg-white/10 py-8">
          <h1 className="text-4xl font-bold text-white">Registrasi Akun</h1>
          <form
            onSubmit={RequestProfileDataPWD}
            method="post"
            className="flex h-full w-full flex-col items-center gap-4 space-y-2 px-4 text-white md:px-8"
          >
            <div className="flex w-full grow flex-col gap-4">
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="username"
                  className="text-xs uppercase tracking-wide text-gray-300"
                >
                  username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  autoComplete="new-password"
                  onChange={handleFormChange}
                  className="border-b-2 bg-white/0 p-1 text-xl outline-none focus:outline-white/0 focus:ring-0"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-xs uppercase tracking-wide text-gray-300"
                >
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleFormChange}
                  className="border-b-2 bg-white/0 p-1 text-xl outline-none focus:outline-white/0 focus:ring-0"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <button className="mx-auto w-full rounded-lg bg-[#F5893A] px-4 py-2 font-bold text-white">
                Register
              </button>
              <button
                className="mx-auto w-fit max-w-fit rounded-lg  px-4 py-2 text-white"
                type="button"
                onClick={() => navigate("/auth/sign-in")}
              >
                Sudah punya akun, <span className="underline">masuk</span>
              </button>
            </div>
          </form>

          <div className="flex w-full flex-col gap-2 px-10 text-center text-white">
            <p className="text-sm uppercase tracking-wide">
              Masuk ke akun dengan sosial media
            </p>
            <SignInWithGoogleButton />
            <SignInMicrosoftButton />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;

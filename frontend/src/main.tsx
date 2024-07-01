import ReactDOM from "react-dom/client";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </GoogleOAuthProvider>,
  // </React.StrictMode>
);

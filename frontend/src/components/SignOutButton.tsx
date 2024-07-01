import { useMsal } from "@azure/msal-react";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <div className="ml-auto">
      <button onClick={() => handleLogout("popup")}>
        Sign out using Popup
      </button>
      <button onClick={() => handleLogout("redirect")}>
        Sign out using Redirect
      </button>
    </div>
  );
};

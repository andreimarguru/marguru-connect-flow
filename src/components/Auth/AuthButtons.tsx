import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="px-4 py-1.5 text-sm font-semibold font-sans border border-gray-300 rounded-full text-gray-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
      onClick={() =>
        loginWithRedirect({
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          scope: "offline_access openid profile email",
        } as any)
      }
    >
      Log In
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="px-4 py-1.5 text-sm font-semibold font-sans border border-gray-300 rounded-full text-gray-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
      onClick={() =>
        logout({
          returnTo: import.meta.env.VITE_DEV_URL,
        } as any)
      }
    >
      Log Out
    </button>
  );
};

import Cookies from "js-cookie";
import config from "../utils/config";

export const getUser = async () => {
  const res = await fetch(`https://newsportal-hdb5.onrender.com/api/v1/account/me/`, {
    next: { revalidate: 10 },
    headers: {
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  });

  return res.json();
};

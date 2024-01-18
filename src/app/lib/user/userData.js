import Cookies from "js-cookie";
import config from "../utils/config";

export const getUser = async () => {
  const res = await fetch(`${config.api_url}/account/me/`, {
    next: { revalidate: 10 },
    headers: {
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  });

  return res.json();
};

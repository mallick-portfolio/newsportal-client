import Cookies from "js-cookie";
import config from "../utils/config";

export const getUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account/me/`, {
    next: { revalidate: 10 },
    headers: {
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  });

  return res.json();
};

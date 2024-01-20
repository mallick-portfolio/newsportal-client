import Cookies from "js-cookie";
import config from "../utils/config";

export const getPosts = async (query) => {
  const res = await fetch(
    `https://newsportal-hdb5.onrender.com/api/v1/news/public/${query ? query : ""}`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch res");
  }
  return res.json();
};
export const getById = async (id) => {
  const res = await fetch(
    `https://newsportal-hdb5.onrender.com/api/v1/news/public/${id}/`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch res");
  }
  return res.json();
};
export const addRating = async (id, data) => {
  const res = await fetch(
    `https://newsportal-hdb5.onrender.com/api/v1/news/public/${id}/rating/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch res");
  }
  return res.json();
};

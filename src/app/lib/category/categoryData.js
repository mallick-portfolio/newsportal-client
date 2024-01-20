export const getCategories = async () => {
  const res = await fetch(
    `https://newsportal-hdb5.onrender.com/api/v1/news/public/category/`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch res");
  }
  return res.json();
};

export const getCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/public/category/`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch res");
  }
  return res.json();
};

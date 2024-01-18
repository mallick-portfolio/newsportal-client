export const getPosts = async (query) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/public/${query ? query : ""}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}/news/public/${id}/`,
    {
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch res");
  }
  return res.json();
};

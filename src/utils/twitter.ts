const isDeleted = async (s: string): Promise<boolean> => {
  const response = await fetch(`/api/twitter/${encodeURIComponent(s)}`, {
    method: "HEAD",
  });

  return response.status === 404;
};

export default isDeleted;

const fetchTweetStatus = async (s: string): Promise<number> => {
  const response = await fetch(`/api/twitter/${encodeURIComponent(s)}`, {
    method: "HEAD",
  });

  return response.status;
};

export default fetchTweetStatus;

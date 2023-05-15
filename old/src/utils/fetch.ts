export const fetchPlus = async (
  url: string,
  options = {},
  retries: number
): Promise<Response | null> => {
  try {
    const result = await fetch(url, options);
    if (result === null || !result.ok) {
      if (retries > 0) {
        console.log("retries", retries);
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await fetchPlus(url, options, retries - 1);
      }
    }
    return result;
  } catch (error) {
    if (retries > 0) {
      console.log("retries", retries);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await fetchPlus(url, options, retries - 1);
    }
  }
  return null;
};

const cleanUrl = (url: string) => {
  return url.replace("http://", "https://");
};

export const wrapTweetUrl = (url: string) => {
  return `/api/twitter/${encodeURIComponent(cleanUrl(url))}`;
};

const fetchTweetStatus = async (s: string): Promise<number> => {
  const response = await fetch(
    `/api/twitter/${encodeURIComponent(cleanUrl(s))}`,
    {
      method: "HEAD",
    }
  );

  return response.status;
};

export default fetchTweetStatus;

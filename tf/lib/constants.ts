export const proxySettings = {
  protocol: "http",
  host: process.env.PROXY_HOST!,
  port: process.env.PROXY_PORT! as unknown as number,
  auth: {
    username: process.env.PROXY_USERNAME!,
    password: process.env.PROXY_PASSWORD!,
  },
};

export const getArchiveUrl = (handle: string) =>
  `https://web.archive.org/cdx/search/cdx?url=twitter.com/${handle}/status&matchType=prefix&filter=!statuscode:302`;

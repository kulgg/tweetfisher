import Head from "next/head";

export default function Meta({
  title = "TweetFisher - Find deleted tweets that have been archived by the wayback machine",
  description = "TweetFisher is a tool to find deleted tweets that have been archived by the wayback machine",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Head>
  );
}

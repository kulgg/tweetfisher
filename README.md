<img width="1277" alt="image" src="https://github.com/kulgg/tweetfisher/blob/main/public/hero.gif?raw=true">

<h1 align="center">TweetFisher</h1>

<p align="center">
    Next.js app that <b>finds deleted tweets</b> that have been archived by the <a href="https://web.archive.org/">wayback machine</a>
</p>

<p align="center">
  <a href="#getting-started"><strong>Getting Started</strong></a> ·
  <a href="#stack"><strong>Stack</strong></a> ·
  <a href="#ToDo"><strong>ToDo</a> ·
  <a href="#faq"><strong>FAQ</strong></a>
</p>
<br/>

## Getting started

### Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/download/)

### Running locally

```
git clone https://github.com/kulgg/tweetfisher.git
```

```
cd tweetfisher
```

```
npm install
```

`Before running`: Copy _.env.example_ to _.env.local_

```
npm run dev
```

## Stack

- **Framework**: <a href="https://nextjs.org">Next.js</a>
- **Styling**: <a href="https://tailwindcss.com/">Tailwind CSS</a>
- **State management**: <a href="https://jotai.org/">jotai</a>
- **UI Components:**: <a href="https://ui.shadcn.com">shadcn</a>

## ToDo

- Add export functionality
- Parse quote tweets
- Adaptive throttling

## FAQ

### Why is this not hosted somewhere?

Initially, I wanted to perform all requests on the client-side to avoid throttling problems and allow for easy hosting for users. However, I soon realized that this was not possible. Both archive.org and twitter.com do not set the required CORS headers, making it impossible to access response contents from the frontend code, even when using the 'no-cors' mode for requests. Furthermore, the HTTP HEAD requests to twitter.com that check for deleted tweets must imitate search engine headers to function properly, but this cannot be done in frontend requests as the browser adds additional headers.

As a solution, all requests have been wrapped by Next.js API routes. Unfortunately, this makes it difficult to host this app for widespread use due to throttling constraints.

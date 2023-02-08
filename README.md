<h1 align="center">TweetFisher</h1>

Uncover the Lost Gems: Next.js app that **finds deleted tweets** that have been archived by the wayback machine ([archive.org](https://web.archive.org/))

## Getting started

### Prerequisites

- Install [Node.js and npm](https://nodejs.org/en/download/)

### Running locally

1. `git clone https://github.com/kulgg/tweetfisher.git`

2. `cd tweetfisher`

3. `npm install`

4. `npm run dev`

```

## FAQ

### Why is this not hosted somewhere?

Initially, I wanted to perform all requests on the client-side to avoid throttling problems and allow for easy hosting for users. However, I soon realized that this was not possible. Both archive.org and twitter.com do not set the required CORS headers, making it impossible to access response contents from the frontend code, even when using the 'no-cors' mode for requests. Furthermore, the HTTP HEAD requests to twitter.com that check for deleted tweets must imitate search engine headers to function properly, but this cannot be done in frontend requests as the browser adds additional headers.

As a solution, all requests have been wrapped by Next.js API routes. Unfortunately, this makes it difficult to host this app for widespread use due to throttling constraints.

## Additional Features

- [ ] Consider account state (Active, Inactive, Suspended)
- [ ] Adaptive throttling
- [ ] Parse quote tweets

### Backlog

- [x] Backend should request multiple times incase of failure
- [x] Do requests concurrently with ability to set max TPS
- [x] Fetch deleted tweets parallel to status checking process
- [x] Show deleted tweets fetching process
- [x] Support parsing of Jul 2022 and later version
- [x] Use throttled queue instead
- [x] Fix emojs in tweets
- [x] Support image parsing
- [x] Support "replies to"
- [x] Fix parsing bugs
- [x] Add scrollup button
- [x] Add popon header
- [x] Add throttle settings PopUp UI
- [x] Finish sticky header
- [x] Validate that urls are of an actual status
- [x] Queues should instantly use updated TPS values
- [x] Fix Index state mess
```

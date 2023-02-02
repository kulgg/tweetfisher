# Find Deleted Tweets

Next.js app that finds deleted tweets that have been archived by the wayback machine ([archive.org](https://web.archive.org/))

### Why are the requests not done client side?

Initially I wanted to do all requests client side so that I could host the app for users and not run into throttling problems. However, I quickly discovered that it's not possible.

Both archive.org and twitter.com do not set the needed CORS headers. Therefore you cannot access the contents of the response from frontend code even if you set 'no-cors' mode for the request. Additionally the HTTP HEAD requests to twitter.com that check wether tweets have been deleted need to imitate search engine headers to work. This can also not be done in frontend requests because the browser always adds additional headers.

As a solution, all requests are wrapped by Next.js API routes. Unfortunately this means that it is hard to host this app for distributed use, because of throttling contraints.

ToDo

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
- [ ] Queues should instantly use updated TPS values
- [ ] Check if account is active or not
- [ ] Fix Index state mess
- [ ] Validate that urls are of an actual status

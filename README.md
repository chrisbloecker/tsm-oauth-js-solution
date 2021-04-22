# tsm-oauth-js
This repository contains a starting point for a simple app, intended for learning about OAuth2 with JavaScript.

## Getting started
To run the code in this repository, you need [Node.js](https://nodejs.org/en/download/).

You also need [express](https://www.npmjs.com/package/express), [pug](https://www.npmjs.com/package/pug), and [axios](https://www.npmjs.com/package/axios).
Install those libraries with `npm install express pug axios`.
If everything is set up, you can run the app with `node app.js` and then access it at `http://localhost:5000`.

## Dependencies
Here, we use express as a web framework, pug as a template engine, and axios to make get and post requests.
pug templates are stored in the `views` folder and have a `pug` extension.
You can find quickstart guides here
- [express quickstart](https://expressjs.com/en/starter/hello-world.html)
- [pug quickstart](https://pugjs.org/api/getting-started.html)
- [axios quickstart](https://github.com/axios/axios#example)

We also use the [milligram css framework](https://milligram.io/) for styling.

If you are more comfortable with other libraries, you are free to use them.
express, pug, and axios serve only as suggestions because they are popular and it's easy to find examples and help online.

## Workflow idea
1. The user visits the index page under `/`
    - if the user is not logged in, we display a login button
    - if the user is logged in, we receive an access token, display a greeting with the user's name, and show a logout button
2. Clicking on the login button sends the user to the `/auth` route, which then sends the user on to an authorisation URL
3. After the user has authorised the external app to provide us with their information, they are redirected to the `/auth/callback` route where we receive a temporary code that we use to get an access token for the user's information
4. We redirect the user back to the index page together with the access token

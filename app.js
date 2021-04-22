// in this mini app, we're implementing OAuth authentication with github and follow
// the workflow described here: https://docs.github.com/en/developers/apps/authorizing-oauth-apps

// we use the express web framework, see here for a quickstart guide:
const express = require("express")
const app     = express()
const port    = 5000

// template engine
app.set('view engine', 'pug')

// for making get and post requests
const axios = require("axios")

// ToDo: fill in your client ID and secret you got from github.
//       remember, you don't want to commit those strings to your repository, otherwise
//       everybody who can see your code can use your github account for OAuth
const client_id     = undefined
const client_secret = undefined

// ToDo: add the the different URLs for using OAuth with github as constants below...


// the index page. for this mini app, let's assume that we handle sessions with
// url parameters. we assume that, if a user is logged in, an OAuth access token
// is passed to this function in the url.
//
// there are certainly many ways to do it, but here, let's use a template that
// contains code for both cases. depending on a (possible undefined) user's name
// that we pass into the template, we decide what to display.
app.get("/", (req, res) => {
  access_token = req.query.access_token
  username     = undefined

  // ToDo: add code for getting the user's name here...
  //  - if we don't get an access token, display a "login with github" button
  //  - if we have an access token, use if to fetch the user info. use it to display
  //    a greeting that includes the user's name, and a logout button

  res.render("index", { username: username })
})


// the auth route.
app.get("/auth", (req, res) => {
  // ToDo: redirect the user to github's authorisation url (we could do this also
  //       directly with the login button)
  res.redirect(undefined)
})


// the callback url where github redirects the user. we receive a temporary code
//  that we can use to get an access token for the user's account data.
app.get("/auth/callback", (req, res) => {
  code = req.query.code

  // ToDo: use the temporary code we got to get an access token from GitHub
  access_token = undefined

  res.redirect(`/?access_token=${accessToken}`)
})


app.listen(port, () => {
  console.log(`tsm-oauth-js listening at http://localhost:${port}`)
})

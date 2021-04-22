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

const client_id     = "c3b8d8b7d1b5d3b87e18"
const client_secret = "21361fb166fa6340fa16b1b40960e7b1977012c5"

const redirectURL   = "http://localhost:5000/auth/callback"
const authorizeURL  = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirectURL}`
const getTokenURL   = "https://github.com/login/oauth/access_token"


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
  if (access_token !== undefined)
  {
    axios.request({ url: "https://api.github.com/user"
                  , method: "get"
                  , headers: { Authorization: `token ${access_token}` }
                  })
         .then(response => {
           res.render( "index"
                     , { title: "Hello OAuth"
                       , username: response.data.name
                       }
                     )
         })
  }
  else
    res.render("index")
})


// the auth route.
app.get("/auth", (req, res) => {
  res.redirect(authorizeURL)
})


// the callback url where github redirects the user. we receive a code that we
// can use to get an access token for the user's account data.
app.get("/auth/callback", (req, res) => {
  code = req.query.code

  axios.request({ url: getTokenURL
                , params: { client_id: client_id, client_secret: client_secret, code: code }
                , method: "post"
                , headers: { accept: "application/json" }
                })
       .then(response => {
          const accessToken = response.data.access_token
          res.redirect(`/?access_token=${accessToken}`)
       })
})


app.listen(port, () => {
  console.log(`tsm-oauth-js listening at http://localhost:${port}`)
})

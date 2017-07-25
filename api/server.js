/*--------------------------------------------------------------------------
/* SETUP PACKAGES
/*--------------------------------------------------------------------------*/
require('dotenv').config();
var path = require('path');
var qs = require('querystring');

var express = require('express');
var async = require('async');
var colors = require('colors');
var moment = require('moment');
var bodyParser = require('body-parser');
var request = require('request');
var cors = require('cors');
var jwt = require('jwt-simple');

var config = require('./config');

// MODELS
var User = require('./models/user');

// DB CONNECT
var mongoose = require('mongoose');

var options = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};

var conn = config.MONGO_CONN;

mongoose.Promise = global.Promise;
mongoose.connect(conn, options);
mongoose.connection.on('error', console.error.bind(console, 'connection error: '));

mongoose.connection.once('open', function () {
  var app = express();

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());

  var port = process.env.PORT || 8080; // set our port

  /*--------------------------------------------------------------------------
  /* LOGIN REQUIRED MIDDLEWARE
  /*--------------------------------------------------------------------------*/
  function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
      return res.status(401).send({
        message: 'Please make sure your request has an Authorization header'
      });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
      payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (err) {
      return res.status(401).send({
        message: err.message
      });
    }

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'Token has expired'
      });
    }

    req.user = payload.sub;
    next();
  }

  /*--------------------------------------------------------------------------
  /* GENERATE JSON WEB TOKEN
  /*--------------------------------------------------------------------------*/
  function createJWT(user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix(),
      role: user.role
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
  }

  /*--------------------------------------------------------------------------
  /* AUTH ROUTES
  /*--------------------------------------------------------------------------*/
  var auth_router = express.Router();

  auth_router.use(function (req, res, next) {
    // do logging
    console.log(req.ip + ' requesting ' + req.originalUrl);
    next(); // make sure we go to the next routes and don't stop here
  });

  /* LOGIN */
  auth_router.route('/login')

    // http://localhost:8080/auth/login
    .post(function (req, res) {
      User.findOne({
        email: req.body.email
      }, '+password', function (err, user) {
        if (!user) {
          return res.status(401).send({
            message: 'Invalid email and/or password'
          });
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (!isMatch) {
            return res.status(401).send({
              message: 'Invalid email and/or password'
            });
          }
          res.send({
            token: createJWT(user)
          });
        });
      });
    });

  /* SIGNUP */
  auth_router.route('/signup')

    // http://localhost:8080/auth/signup
    .post(function (req, res) {
      User.findOne({
        email: req.body.email
      }, function (err, existingUser) {
        if (existingUser) {
          return res.status(409).send({
            message: 'Email is already taken'
          });
        }
        if (req.body.isAdmin === true) {
          role = 'ADMIN';
        } else if (req.body.isDev === true) {
          role = 'DEV';
        } else {
          role = 'USER';
        }
        var user = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password,
          role: role
        });
        user.save(function (err, result) {
          if (err) {
            res.status(500).send({
              message: err.message
            });
          }
          res.send({
            token: createJWT(result)
          });
        });
      });
    });

  /* GOOGLE */
  auth_router.route('/google')

    // http://localhost:8080/auth/google
    .post(function (req, res) {
      var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
      var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
      };

      // Step 1. Exchange authorization code for access token.
      request.post(accessTokenUrl, {
        json: true,
        form: params
      }, function (err, response, token) {
        var accessToken = token.access_token;
        var headers = {
          Authorization: 'Bearer ' + accessToken
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
          url: peopleApiUrl,
          headers: headers,
          json: true
        }, function (err, response, profile) {
          if (profile.error) {
            return res.status(500).send({
              message: profile.error.message
            });
          }
          // Step 3a. Link user accounts.
          if (req.header('Authorization')) {
            User.findOne({
              google: profile.sub
            }, function (err, existingUser) {
              if (existingUser) {
                return res.status(409).send({
                  message: 'There is already a Google account that belongs to you'
                });
              }
              var token = req.header('Authorization').split(' ')[1];
              var payload = jwt.decode(token, config.TOKEN_SECRET);
              User.findById(payload.sub, function (err, user) {
                if (!user) {
                  return res.status(400).send({
                    message: 'User not found'
                  });
                }
                user.google = profile.sub;
                user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                user.displayName = user.displayName || profile.name;
                user.save(function () {
                  var token = createJWT(user);
                  res.send({
                    token: token
                  });
                });
              });
            });
          } else {
            // Step 3b. Create a new user account or return an existing one.
            User.findOne({
              google: profile.sub
            }, function (err, existingUser) {
              if (existingUser) {
                return res.send({
                  token: createJWT(existingUser)
                });
              }
              var user = new User();
              user.google = profile.sub;
              user.picture = profile.picture.replace('sz=50', 'sz=200');
              user.displayName = profile.name;
              user.save(function (err) {
                var token = createJWT(user);
                res.send({
                  token: token
                });
              });
            });
          }
        });
      });
    });

  /* GITHUB */
  auth_router.route('/github')

    // http://localhost:8080/auth/github
    .post(function (req, res) {
      var accessTokenUrl = 'https://github.com/login/oauth/access_token';
      var userApiUrl = 'https://api.github.com/user';
      var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GITHUB_SECRET,
        redirect_uri: req.body.redirectUri
      };

      // Step 1. Exchange authorization code for access token.
      request.get({
        url: accessTokenUrl,
        qs: params
      }, function (err, response, accessToken) {
        accessToken = qs.parse(accessToken);
        var headers = {
          'User-Agent': 'Satellizer'
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({
          url: userApiUrl,
          qs: accessToken,
          headers: headers,
          json: true
        }, function (err, response, profile) {

          // Step 3a. Link user accounts.
          if (req.header('Authorization')) {
            User.findOne({
              github: profile.id
            }, function (err, existingUser) {
              if (existingUser) {
                return res.status(409).send({
                  message: 'There is already a GitHub account that belongs to you'
                });
              }
              var token = req.header('Authorization').split(' ')[1];
              var payload = jwt.decode(token, config.TOKEN_SECRET);
              User.findById(payload.sub, function (err, user) {
                if (!user) {
                  return res.status(400).send({
                    message: 'User not found'
                  });
                }
                user.github = profile.id;
                user.picture = user.picture || profile.avatar_url;
                user.displayName = user.displayName || profile.name;
                user.save(function () {
                  var token = createJWT(user);
                  res.send({
                    token: token
                  });
                });
              });
            });
          } else {
            // Step 3b. Create a new user account or return an existing one.
            User.findOne({
              github: profile.id
            }, function (err, existingUser) {
              if (existingUser) {
                var token = createJWT(existingUser);
                return res.send({
                  token: token
                });
              }
              var user = new User();
              user.github = profile.id;
              user.picture = profile.avatar_url;
              user.displayName = profile.name;
              user.email = profile.email;

              user.save(function () {
                var token = createJWT(user);
                res.send({
                  token: token
                });
              });
            });
          }
        });
      });
    });

  /* WINDOWS */
  auth_router.route('/live')

    // http://localhost:8080/auth/live
    .post(function (req, res) {
      async.waterfall([
        // Step 1. Exchange authorization code for access token.
        function (done) {
          var accessTokenUrl = 'https://login.live.com/oauth20_token.srf';
          var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: config.WINDOWS_LIVE_SECRET,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
          };
          request.post(accessTokenUrl, {
            form: params,
            json: true
          }, function (err, response, accessToken) {
            done(null, accessToken);
          });
        },
        // Step 2. Retrieve profile information about the current user.
        function (accessToken, done) {
          var profileUrl = 'https://apis.live.net/v5.0/me?access_token=' + accessToken.access_token;
          request.get({
            url: profileUrl,
            json: true
          }, function (err, response, profile) {
            done(err, profile);
          });
        },
        function (profile) {
          // Step 3a. Link user accounts.
          if (req.header('Authorization')) {
            User.findOne({
              live: profile.id
            }, function (err, user) {
              if (user) {
                return res.status(409).send({
                  message: 'There is already a Windows Live account that belongs to you'
                });
              }
              var token = req.header('Authorization').split(' ')[1];
              var payload = jwt.decode(token, config.TOKEN_SECRET);
              User.findById(payload.sub, function (err, existingUser) {
                if (!existingUser) {
                  return res.status(400).send({
                    message: 'User not found'
                  });
                }
                existingUser.live = profile.id;
                existingUser.displayName = existingUser.displayName || profile.name;
                existingUser.save(function () {
                  var token = createJWT(existingUser);
                  res.send({
                    token: token
                  });
                });
              });
            });
          } else {
            // Step 3b. Create a new user or return an existing account.
            User.findOne({
              live: profile.id
            }, function (err, user) {
              if (user) {
                return res.send({
                  token: createJWT(user)
                });
              }
              var newUser = new User();
              newUser.live = profile.id;
              newUser.displayName = profile.name;
              newUser.save(function () {
                var token = createJWT(newUser);
                res.send({
                  token: token
                });
              });
            });
          }
        }
      ]);
    });

  /* TWITTER */
  auth_router.route('/twitter')

    // http://localhost:8080/auth/twitter
    .post(function (req, res) {
      var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
      var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
      var profileUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';

      // Part 1 of 2: Initial request from Satellizer.
      if (!req.body.oauth_token || !req.body.oauth_verifier) {
        var requestTokenOauth = {
          consumer_key: config.TWITTER_KEY,
          consumer_secret: config.TWITTER_SECRET,
          callback: req.body.redirectUri
        };

        // Step 1. Obtain request token for the authorization popup.
        request.post({
          url: requestTokenUrl,
          oauth: requestTokenOauth
        }, function (err, response, body) {
          var oauthToken = qs.parse(body);

          // Step 2. Send OAuth token back to open the authorization screen.
          res.send(oauthToken);
        });
      } else {
        // Part 2 of 2: Second request after Authorize app is clicked.
        var accessTokenOauth = {
          consumer_key: config.TWITTER_KEY,
          consumer_secret: config.TWITTER_SECRET,
          token: req.body.oauth_token,
          verifier: req.body.oauth_verifier
        };

        // Step 3. Exchange oauth token and oauth verifier for access token.
        request.post({
          url: accessTokenUrl,
          oauth: accessTokenOauth
        }, function (err, response, accessToken) {

          accessToken = qs.parse(accessToken);

          var profileOauth = {
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            token: accessToken.oauth_token,
            token_secret: accessToken.oauth_token_secret,
          };

          // Step 4. Retrieve user's profile information and email address.
          request.get({
            url: profileUrl,
            qs: {
              include_email: true
            },
            oauth: profileOauth,
            json: true
          }, function (err, response, profile) {

            // Step 5a. Link user accounts.
            if (req.header('Authorization')) {
              User.findOne({
                twitter: profile.id
              }, function (err, existingUser) {
                if (existingUser) {
                  return res.status(409).send({
                    message: 'There is already a Twitter account that belongs to you'
                  });
                }

                var token = req.header('Authorization').split(' ')[1];
                var payload = jwt.decode(token, config.TOKEN_SECRET);

                User.findById(payload.sub, function (err, user) {
                  if (!user) {
                    return res.status(400).send({
                      message: 'User not found'
                    });
                  }

                  user.twitter = profile.id;
                  user.email = profile.email;
                  user.displayName = user.displayName || profile.name;
                  user.picture = user.picture || profile.profile_image_url_https.replace('_normal', '');
                  user.save(function (err) {
                    res.send({
                      token: createJWT(user)
                    });
                  });
                });
              });
            } else {
              // Step 5b. Create a new user account or return an existing one.
              User.findOne({
                twitter: profile.id
              }, function (err, existingUser) {
                if (existingUser) {
                  return res.send({
                    token: createJWT(existingUser)
                  });
                }

                var user = new User();
                user.twitter = profile.id;
                user.email = profile.email;
                user.displayName = profile.name;
                user.picture = profile.profile_image_url_https.replace('_normal', '');
                user.save(function () {
                  res.send({
                    token: createJWT(user)
                  });
                });
              });
            }
          });
        });
      }
    });

  /* UNLINK */
  auth_router.route('/unlink')

    // http://localhost:8080/auth/unlink
    .post(ensureAuthenticated, function (req, res) {
      var provider = req.body.provider;
      var providers = ['facebook', 'foursquare', 'google', 'github', 'instagram',
        'linkedin', 'live', 'twitter', 'twitch', 'yahoo', 'bitbucket', 'spotify'
      ];

      if (providers.indexOf(provider) === -1) {
        return res.status(400).send({
          message: 'Unknown OAuth Provider'
        });
      }

      User.findById(req.user, function (err, user) {
        if (!user) {
          return res.status(400).send({
            message: 'User Not Found'
          });
        }
        user[provider] = undefined;
        user.save(function () {
          res.status(200).end();
        });
      });
    });

  /*--------------------------------------------------------------------------
  /* API ROUTES
  /*--------------------------------------------------------------------------*/
  var api_router = express.Router();

  api_router.use(function (req, res, next) {
    // do logging
    console.log(req.ip + ' requesting ' + req.originalUrl);
    next(); // make sure we go to the next routes and don't stop here
  });

  /* ME */
  api_router.route('/me')

    // http://localhost:8080/api/me
    .get(ensureAuthenticated, function (req, res) {
      User.findById(req.user, function (err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    })

    // http://localhost:8080/api/me
    .put(ensureAuthenticated, function (req, res) {
      User.findById(req.user, function (err, user) {
        if (!user) {
          return res.status(400).send({
            message: 'User not found'
          });
        }
        user.displayName = req.body.displayName || user.displayName;
        user.email = req.body.email || user.email;
        user.save(function (err) {
          res.status(200).end();
        });
      });
    });

  /* USERS */
  api_router.route('/users')

    // http://localhost:8080/api/users
    .get(ensureAuthenticated, function (req, res) {
      User.find(function (err, users) {
        if (err)
          res.send(err);

        res.json(users);
      });
    });

  api_router.route('/users/:user_id')

    // http://localhost:8080/api/users/:user_id
    .get(ensureAuthenticated, function (req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    })

    // http://localhost:8080/api/users/:user_id
    .put(ensureAuthenticated, function (req, res) {

      // use our user model to find the user we want
      User.findById(req.params.user_id, function (err, user) {

        if (err)
          res.send(err);

        user.displayName = req.body.displayName || user.displayName;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        // save the user
        user.save(function (err) {
          if (err)
            res.send(err);

          res.json({
            message: 'User updated!'
          });
        });
      });
    })

    // http://localhost:8080/api/users/:user_id
    .delete(ensureAuthenticated, function (req, res) {
      User.remove({
        _id: req.params.user_id
      }, function (err, user) {
        if (err)
          res.send(err);

        res.json({
          message: 'Successfully deleted'
        });
      });
    });

  // REGISTER OUR ROUTES -------------------------------
  app.use('/api', api_router);
  app.use('/auth', auth_router);

  // START THE SERVER
  // =============================================================================
  app.listen(port);
  console.log('connection to ' + conn);
  console.log('Magic happens on port ' + port);

});
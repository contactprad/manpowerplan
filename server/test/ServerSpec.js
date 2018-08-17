const request = require('superagent');

const app = require('../shortly.js');
const db = require('../app/config');
const Users = require('../app/collections/users');
const User = require('../app/models/user');
const Links = require('../app/collections/links');
const Link = require('../app/models/link');

/************************************************************/
// Jest doesn't have a way to designate pending before blocks.
// Mimic the behavior of .skip with xbeforeEach.
// Remove the 'x' from beforeEach block when working on
// authentication tests.
/************************************************************/
const xbeforeEach = () => { };
/************************************************************/


describe('', () => {
  let server;
  const port = 4568;
  const baseUrl = `http://127.0.0.1:${port}`;
  const phillipInfo = {
    'username': 'Phillip',
    'password': 'Phillip',
  };

  beforeAll(() => {
    server = app.listen(port, () => {
      console.log(`Shortly is listening on ${port}`);
    });
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    // log out currently signed in user
    request.get(`${baseUrl}/logout`)
      .then(() => {});

    // delete link for roflzoo from db so it can be created later for the test
    db.knex('urls')
      .where('url', '=', 'http://roflzoo.com/')
      .del()
      .catch((error) => {
        throw {
          type: 'DatabaseError',
          message: 'Failed to create test setup data',
        };
      });

    // delete user Svnh from db so it can be created later for the test
    db.knex('users')
      .where('username', '=', 'Svnh')
      .del()
      .catch((error) => {
        // uncomment when writing authentication tests
        // throw {
        //   type: 'DatabaseError',
        //   message: 'Failed to create test setup data',
        // };

      });

    // delete user Phillip from db so it can be created later for the test
    db.knex('users')
      .where('username', '=', 'Phillip')
      .del()
      .catch((error) => {
        // uncomment when writing authentication tests
        // throw {
        //   type: 'DatabaseError',
        //   message: 'Failed to create test setup data',
        // };
      });
  });

  describe.skip('User Creation:', () => {
    beforeEach((done) => {
      // create a user that we can then find in the database
      new User(phillipInfo)
        .save()
        .then(done);
    });

    test('New user creates a record in the database', (done) => {
      db.knex('users')
        .where('username', '=', 'Phillip')
        .then((res) => {
          let username;
          if (res[0] && res[0]['username']) {
            username = res[0].username;
          }

          expect(username).toEqual('Phillip');
          done();
        });
    });

    test('Nonexistent user is not found in database', (done) => {
      db.knex('users')
        .where('username', '=', 'Hermione')
        .then((res) => {
          expect(res[0]).toBeUndefined();
          done();
        });
    });
  }); // 'User creation'

  describe.only('Link creation:', () => {
    let agent;
    beforeEach((done) => {
        agent = request.agent();
        // create a user that we can then log in with
        new User(phillipInfo)
          .save()
          .then(() => {
            // login via form and save session info
            agent.post(`${baseUrl}/login`)
              .set('Content-Type', 'application/json')
              .send(phillipInfo)
              .then(done);
          });
      });

    test('Only shortens valid urls, returning a 404 - Not found for invalid urls', (done) => {
      agent.post(`${baseUrl}/links`)
        .set('Content-Type', 'application/json')
        .send({
          'url': 'Test for invalid url',
        })
        .catch((err) => {
          // superagent considers status codes 4XX and 5XX to be errors and
          // when using promises, sends them to the failure callback.
          expect(err.status).toEqual(404);
          done();
        })
    });

    describe('Shortening links:', () => {
      test('Responds with the short code', (done) => {
        agent.post(`${baseUrl}/links`)
          .set('Content-Type', 'application/json')
          .send({
            'url': 'http://roflzoo.com/',
          })
          .then(({ body: { code, url } }) => {
            expect(url).toEqual('http://roflzoo.com/');
            expect(code).not.toBeNull();
            done();
          });
      });

      test('New links create a database entry', (done) => {
        agent.post(`${baseUrl}/links`)
          .set('Content-Type', 'application/json')
          .send({
            'url': 'http://roflzoo.com/',
          })
          .then(() =>
            db.knex('urls')
              .where('url', '=', 'http://roflzoo.com/')
          )
          .then((urls) => {
            let foundUrl;
            if (urls['0'] && urls['0']['url']) {
              foundUrl = urls['0']['url'];
            }

            expect(foundUrl).toEqual('http://roflzoo.com/');
            done();
          });
      });

      test('Fetches the link url title', (done) => {
        agent.post(`${baseUrl}/links`)
          .set('Content-Type', 'application/json')
          .send({
            'url': 'http://roflzoo.com/',
          })
          .then(() =>
            db.knex('urls')
              .where('title', '=', 'Funny pictures of animals, funny dog pictures')
          )
          .then((urls) => {
            let foundTitle;
            if (urls['0'] && urls['0']['title']) {
              foundTitle = urls['0']['title'];
            }

            expect(foundTitle).toEqual('Funny pictures of animals, funny dog pictures');
            done();
          });
      });
    }); // 'Shortening links'

    describe('With previously saved urls:', () => {
      let link;

      beforeEach((done) => {
        // save a link to the database
        link = new Link({
          baseUrl,
          url: 'http://roflzoo.com/',
          title: 'Funny pictures of animals, funny dog pictures',
        });
        link.save().then(done);
      });

      test('Returns the same shortened code', (done) => {
        agent.post(`${baseUrl}/links`)
          .set('Content-Type', 'application/json')
          .send({
            'url': 'http://roflzoo.com/',
          })
          .then(({ body: { code } }) => {
            expect(code).toEqual(link.get('code'));
            done();
          })
      });

      test('Shortcode redirects to correct url', (done) => {
        agent.get(`${baseUrl}/${link.get('code')}`)
          .then(({ request: { url: currentLocation } }) => {
            expect(currentLocation).toEqual('http://roflzoo.com/');
            done();
          })
      });

      test('Returns all of the links to display on the links page', (done) => {
        agent.get(`${baseUrl}/links`)
          .then(({ body }) => {
            // get the code and title from the last link that was created
            const [{ code, title }] = body.slice(-1);

            expect(title).toEqual(link.get('title'));
            expect(code).toEqual(link.get('code'));
            done();
          });
      });
    }); // 'With previously saved urls'
  }); // 'Link creation'

  describe('Privileged Access:', () => {
    test('Redirects to login page if a user tries to access the main page and is not signed in', (done) => {
      request.get(baseUrl)
        .then(({ req: { path } }) => {
          expect(path).toEqual('/login');
          done();
        });
    });

    test('Redirects to login page if a user tries to create a link and is not signed in', (done) => {
      request.get(`${baseUrl}/create`)
        .then(({ req: { path } }) => {
          expect(path).toEqual('/login');
          done();
        });
    });

    test('Redirects to login page if a user tries to see all of the links and is not signed in', (done) => {
      request.get(`${baseUrl}/links`)
        .then(({ req: { path } }) => {
          expect(path).toEqual('/login');
          done();
        });
    });
  }); // 'Privileged Access'

  describe.skip('Account Creation:', () => {
    describe('Password Storage:', () => {
      test('Database does not store plaintext password', (done) => {
        request.post(`${baseUrl}/signup`)
          .set('Content-Type', 'application/json')
          .send(phillipInfo)
          .then(() =>
            db.knex('users')
              .where('username', '=', 'Phillip')
          )
          .then((res) => {
            let password;
            if (res[0] && res[0]['password']) {
              password = res[0]['password'];
            }

            expect(password).not.toEqual('Phillip');
            done();
          });
      });

      test('Stored password is a bcrypt hash', (done) => {
        request.post(`${baseUrl}/signup`)
          .set('Content-Type', 'application/json')
          .send(phillipInfo)
          .then(() =>
            db.knex('users')
              .where('username', '=', 'Phillip')
          )
          .then((res) => {
            let password;
            if (res[0] && res[0]['password']) {
              password = res[0]['password'];
            }

            // bcrypt hashes are 60 characters long and
            // use the prefix '$2a$', '$2b$', or '$2y$'
            expect(password).toHaveLength(60);
            expect(password.slice(0, 4)).toMatch(/\$2([aby])\$/);
            done();
          });
      });
    }); // 'Password Storage'

    describe('Signup:', () => {
      let agent;

      beforeEach(() => {
        agent = request.agent();
      })

      test('Signup creates a user record', (done) => {
        request.post(`${baseUrl}/signup`)
          .set('Content-Type', 'application/json')
          .send({
            username: 'Svnh',
            password: 'Svnh',
          })
          .then(() =>
            db.knex('users')
              .where('username', '=', 'Svnh')
          )
          .then((res) => {
            let user;
            if (res[0] && res[0]['username']) {
              user = res[0]['username'];
            }
            expect(user).toEqual('Svnh');
            done();
          }).catch((err) => {
            throw {
              type: 'DatabaseError',
              message: 'Failed to create test setup data',
            };
          });
      });

      test('Signup logs in a new user', (done) => {
        agent.post(`${baseUrl}/signup`)
          .set('Content-Type', 'application/json')
          .send(phillipInfo)
          .then(({ redirects: [redirect] }) => {
            // Get the path of the redirect URL
            expect(redirect.split(baseUrl)[1]).toEqual('/');
            done();
          });
      });

      test('Signup with existing username redirects to login page', (done) => {
        agent.post(`${baseUrl}/signup`)
          .set('Content-Type', 'application/json')
          .send(phillipInfo)
          .then(() =>
            agent.post(`${baseUrl}/signup`)
              .set('Content-Type', 'application/json')
              .send(phillipInfo)
          )
          .then(({ redirects: [redirect] }) => {
            // Get the path of the redirect URL
            expect(redirect.split(baseUrl)[1]).toEqual('/login');
            done();
          });
      });
    }); // 'Signup'
  }); // 'Account Creation'

  describe.only('Account Login:', () => {
    let agent;

    beforeEach((done) => {
      agent = request.agent();
      new User(phillipInfo)
        .save()
        .then(done);
    });

    test('Logs in existing users', (done) => {
      agent.post(`${baseUrl}/login`)
        .set('Content-Type', 'application/json')
        .send(phillipInfo)
        .then(({ redirects: [redirect] }) => {
          // Get the path of the redirect URL
          expect(redirect.split(baseUrl)[1]).toEqual('/');
          done();
        });
    });

    test('Users that do not exist are sent to signup page', (done) => {
      agent.post(`${baseUrl}/login`)
        .set('Content-Type', 'application/json')
        .send({
          username: 'Fred',
          password: 'Fred',
        })
        .then(({ redirects: [redirect] }) => {
          // Get the path of the redirect URL
          expect(redirect.split(baseUrl)[1]).toEqual('/signup');
          done();
        });
    });

    test('Existing users with incorrect passwords are kept on login page', (done) => {
      agent.post(`${baseUrl}/login`)
        .set('Content-Type', 'application/json')
        .send({
          username: 'Phillip',
          password: 'Not Phillip',
        })
        .then(({ redirects: [redirect] }) => {
          // Get the path of the redirect URL
          expect(redirect.split(baseUrl)[1]).toEqual('/login');
          done();
        });
    });
  }); // 'Account Login'
});

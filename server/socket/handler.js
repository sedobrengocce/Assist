const http = require('http');
const xml2js = require('xml2js');
const moment = require('moment');

const connectedUsers = {};

function retrieveCookies(id) {
  let cookie = '';
  // eslint-disable-next-line
  for (const c of connectedUsers[id].user.auth) { 
    cookie += `${c}; `;
  }
  return cookie;
}

function bblogin(data) {
  const tmpusr = connectedUsers[this.client.id];
  const username = data.username;
  const code = data.code;
  const request = http.request({
    method: 'GET',
    host: 'bbapi.buzzerbeater.com',
    path: `/login.aspx?login=${username}&code=${code}` },
  (result) => {
    const parser = new xml2js.Parser();
    let body = '';
    result.on('data', (d) => { body += d; });
    result.on('end', () => {
      parser.parseString(body, (err, json) => {
        // eslint-disable-next-line
        if (json.hasOwnProperty('bbapi')) {
          // eslint-disable-next-line
          if (json.bbapi.hasOwnProperty('loggedIn')) {
            const auth = [];
            // eslint-disable-next-line
            for (const c of result.headers['set-cookie']) { 
              auth.push(c.split(';')[0]);
            }
            tmpusr.user = {
              login: username,
              auth,
              expire: moment().add(60, 'm'),
            };
            http.get({
              host: 'bbapi.buzzerbeater.com',
              path: '/teaminfo.aspx',
              headers: {
                Cookie: result.headers['set-cookie'],
              } }, (res) => {
              const p = new xml2js.Parser();
              let b = '';
              res.on('data', (d) => { b += d; });
              res.on('end', () => {
                p.parseString(b, (e, j) => {
                  // eslint-disable-next-line
                  if (j.hasOwnProperty('bbapi')) {
                    // eslint-disable-next-line
                    if (j.bbapi.hasOwnProperty('team')) {
                      // eslint-disable-next-line
                      tmpusr.socket.emit('login', { status: 'Success', team: parseInt(j.bbapi.team[0].$.id) });
                    }
                  }
                });
              });
            });
          } else { tmpusr.socket.emit('login', { status: 'Failed' }); }
        }
      });
    });
  });
  request.on('error', (err) => {
    // eslint-disable-next-line
    console.log(err);
    tmpusr.socket.emit('login', { status: 'Failed' });
  });
  request.end();
}

function bblogout() {
  const cookie = retrieveCookies(this.client.id);
  const socket = connectedUsers[this.client.id].socket;
  http.get({
    host: 'bbapi.buzzerbeater.com',
    path: '/logout.aspx',
    headers: {
      Cookie: cookie,
    } },
  (result) => {
    const parser = new xml2js.Parser();
    let body = '';
    result.on('data', (d) => { body += d; });
    result.on('end', () => {
      parser.parseString(body, (err, json) => {
        // eslint-disable-next-line
        if (json.hasOwnProperty('bbapi')) {
          // eslint-disable-next-line
          if (json.bbapi.hasOwnProperty('loggedOut')) {
            socket.emit('logout', { status: 'Success' });
          } else { socket.emit('logout', { status: 'Success' }); }
        } else { socket.emit('logout', { status: 'Success' }); }
      });
    });
  },
  );
}


exports.onConnection = function onConnection(socket) {
  socket.emit('greetings');
  connectedUsers[socket.client.id] = {
    socket,
    user: {
      login: '',
      auth: '',
      expire: null,
    },
  };

  /**
   *  Socket Event Listeners
   */
  socket.on('login', bblogin);
  socket.on('logout', bblogout);
  socket.on('disconnect', () => {
    delete connectedUsers[socket.client.id];
  });
};

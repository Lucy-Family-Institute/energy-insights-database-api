const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 3000;

const db = require('./queries');
app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});
app.get('/users/:id', db.getEnergyData);

// app.get('/users', db.getUsers);
// app.post('/users', db.createUser);
// app.put('/users/:id', db.updateUser);
// app.delete('/users/:id', db.deleteUser);

var server = app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
server.setTimeout(300000);
// index.js

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
// Sample data - replace with a database in a real application
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// testing route for VueJs
app.post('/saveData', (req, res) => {
  console.log(req.body);
  res.json({ msg: 'successfully saved !!!' });
});

// GET a single user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// POST a new user
app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.json(user);
});

// PUT update an existing user by ID
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.name = req.body.name;
  res.json(user);
});

// DELETE a user by ID
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send('User not found');
  }
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

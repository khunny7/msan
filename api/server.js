const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = (process.env.PORT || '3080');

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '../webapp/build/')));

// place holder for the data
const users = [
    {
      firstName: "first1",
      lastName: "last1",
      email: "abc@gmail.com"
    },
  ];

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  // res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  res.send('abc');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api', (request, response) => {
  response.json({ 'ok': true });
});

app.listen(port);

console.log(`Listening on port ${port}`);

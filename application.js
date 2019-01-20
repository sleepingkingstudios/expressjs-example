const express = require('express');

const app = express();

app.get('/api', (request, response) => {
  response.json({ ok: true });
});

module.exports = app;

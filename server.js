const app = require('./application');

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`Listening on port ${port}`); // eslint-disable-line no-console

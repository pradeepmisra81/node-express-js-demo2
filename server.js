const express = require('express');
const path = require('path');

const teamRouter = require('./routes/friends.router');
const worklabRouter = require('./routes/messages.router');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.use('/site', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My Work Lab',
    caption: 'Let\'s go Work Lab!',
  });
});
app.use('/team', teamRouter);
app.use('/worklab', worklabRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
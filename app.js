// Initialize express
const express = require('express')
const app = express()
// require handlebars
var exphbs = require('express-handlebars');

// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
const models = require('./db/models');


// OUR MOCK ARRAY OF PROJECTS
var albums = [
  { title: "I am your first album", desc: "A great album that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your second album", desc: "A great album that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
  { title: "I am your third album", desc: "A great album that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
]

// The following line must appear AFTER const app = express() and before your routes!
app.use(bodyParser.urlencoded({ extended: true }));

// INDEX
app.get('/', (req, res) => {
  models.Album.findAll({ order: [['createdAt', 'DESC']] }).then(albums => {
    res.render('albums-index', { albums: albums });
  })
});
// NEW
app.get('/albums/new', (req, res) => {
  res.render('albums-new', {});
});
// CREATE
app.post('/albums', (req, res) => {
  models.Album.create(req.body).then(album => {
    res.redirect(`/albums/${album.id}`);
  }).catch((err) => {
    console.log(err)
  });
});
// SHOW
app.get('/albums/:id', (req, res) => {
  // Search for the album by its id that was passed in via req.params
  models.Album.findByPk(req.params.id).then((album) => {
    // If the id is for a valid album, show it
    res.render('albums-show', { album: album })
  }).catch((err) => {
    // if they id was for an album not in our db, log an error
    console.log(err.message);
  })
});
// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

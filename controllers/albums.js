module.exports = function (app, models) {

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
  // EDIT
  app.get('/albums/:id/edit', (req, res) => {
    models.Album.findByPk(req.params.id).then((album) => {
      res.render('albums-edit', { album: album });
    }).catch((err) => {
      console.log(err.message);
    })
  });
  // UPDATE
  app.put('/albums/:id', (req, res) => {
    models.Album.findByPk(req.params.id).then(album => {
      album.update(req.body).then(album => {
        res.redirect(`/albums/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
  // DELETE
  app.delete('/albums/:id', (req, res) => {
    models.Album.findByPk(req.params.id).then(album => {
      album.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })
}

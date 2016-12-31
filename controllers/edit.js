var editController = {
  index: function(req, res) {
    res.render('edit', {user: req.user});
  }
};

module.exports = editController;
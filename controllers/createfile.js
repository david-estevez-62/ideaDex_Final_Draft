var signupController = {
  index: function (req, res) {
    res.render('createacct', {error: req.flash('error')});
  }
};

module.exports = signupController;
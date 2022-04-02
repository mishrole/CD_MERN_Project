const index = (req, res) => {
  res.redirect('/api');
}

const welcome = (req, res) => {
  res.json({
    message: 'Welcome to the ChatApp API!',
  });
}

const IndexController = {
  index,
  welcome
};

module.exports = IndexController;
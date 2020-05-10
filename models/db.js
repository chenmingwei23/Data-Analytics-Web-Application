var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Assignment2', { useNewUrlParser: true }, function () {
  console.log('mongodb revision connected')
});

module.exports = mongoose;


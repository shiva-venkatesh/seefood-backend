var express = require('express')
var app = express()
var Clarifai = require('clarifai')
var secrets = require('./secrets')
var keys = secrets.clarifaiConfig()

var ClarifaiInstance = new Clarifai.App(
  keys.access_key,
  keys.secret_key
)

var store

var foodModel = 'bd367be194cf45149e75f01d59f77ba7'
function getPredictionAsJSON(imageURL) {
  ClarifaiInstance.models.predict(foodModel, imageURL).then(
    function(response) {
      store = response
    },
    function(err) {
      console.error(err);
    }
  );
}

app.listen(8000, function () {
  getPredictionAsJSON('https://images.pexels.com/photos/66436/pexels-photo-66436.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
  console.log('Recognize app listening on port 8000!')

  app.get('/classify', function(req, res) {
    res.json((store.outputs[0]));
  });
})

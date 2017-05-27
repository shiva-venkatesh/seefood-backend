var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var Clarifai = require('clarifai')
var secrets = require('./secrets')
var keys = secrets.clarifaiConfig()

app.use(bodyParser.json());

var ClarifaiInstance = new Clarifai.App(
  keys.access_key,
  keys.secret_key
)

var store

var foodModel = 'bd367be194cf45149e75f01d59f77ba7'
var fnol = function getPredictionAsJSON(imageURL) {
  ClarifaiInstance.models.predict(foodModel, imageURL).then(
    function(response) {
      store = response.outputs[0].data
      console.log(store + ' from inside the fn');
    },
    function(err) {
      console.error(err);
    }
  );
  return store
}

app.listen(8000, function () {
  console.log('Recognize app listening on port 8000!')

  app.post('/classify', function(req, res) {
    var clarifaiData
    var imageURL = req.body.imageURL
      clarifaiData = fnol(imageURL)
      // console.log('cldata : '+ clarifaiData)
      var responseObject = {imageURL: imageURL, data: clarifaiData }
      // console.log('rObj : '+responseObject)
      res.send((responseObject));
  });

  app.get('/classify', function(req, res) {
    res.json((store));
  });
})

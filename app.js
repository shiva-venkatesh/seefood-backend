var express = require('express')
var app = express()
var Clarifai = require('clarifai');
var ClarifaiInstance = new Clarifai.App(
  'Sqf4iUA8kzqG0GJw51pr2udTTeNVTrKMlWZ_dbEs',
  'iBvq3wD90PG39-s8fRyD2xR3pv2PGVqypS_I2swq'
);

var store

function getPredictionAsJSON(imageURL) {
  ClarifaiInstance.models.predict('bd367be194cf45149e75f01d59f77ba7', imageURL).then(
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

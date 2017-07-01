var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var upload = multer({ dest: './tmp/'});


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file_upload',upload.single('file'), function (req, res) {
   
   var file = __dirname + "/" + req.file.originalname;
   console.log(file);
   console.log(req.file);
   fs.readFile( req.file.path, function (err, data) {
      
         if( err ){
            console.log( err );
            }else{
               response = new Buffer(data).toString('base64')
               
            }
         
         res.end( JSON.stringify( response ) );
      
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
var express = require( 'express' );
var app = express();
var port = process.env.PORT || 8080;

app.use( function( req, res, next ) {
  var headerData = {};
  var ip = req.ip;
  //handle ipv4 prefix:
  if (ip.substr(0, 7) == "::ffff:") {
    ip = ip.substr(7);
  }
  headerData.ipAddress = ip;
  headerData.language = req.acceptsLanguages()[ 0 ];
  var userAgent = req.get( 'user-agent' )
  //contents of first parentheses:
  headerData.software = userAgent.split( '(' )[ 1 ].split( ')' )[ 0 ];
  res.send( JSON.stringify( headerData ) );
} );

app.use( function( err, req, res, next ) {
  console.log( err );
} )

app.listen( port, function() {
  //console.log( 'Example app listening on port %d!', port );
} );

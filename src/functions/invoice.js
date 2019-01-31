var Api2Pdf = require('api2pdf');

var a2pClient = new Api2Pdf('a1a44906-b78d-44d6-847f-f98e7c38b6dc');
var options = {
  landscape: false,
  scale: 2,
  paperWidth: 8.27,
  paperHeight: 11.69,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0
};

exports.handler = async (event, context) => {
  var path = event.path.split('/');
  var token = path[path.length - 1];
  var number = path[path.length - 2];

  if (path.length > 2 && token.indexOf('eyJ') >= 0) {
    return a2pClient.headlessChromeFromUrl(
        `https://cpont-test-pdf--acrabadabra.netlify.com/invoice/${ token }`,
        inline = true,
        filename = `${ number }.pdf`,
        options = options
     )
     .then(response => {
       return {
         statusCode: 307,
         body: '',
         headers: {
           Location: response.pdf
         }
       };
     }).catch(error => {
       console.log(error);
       return {
         statusCode: 500,
         body: 'An error occured during the generation of the PDF'
       };
     });
  } else {
    console.log(path);
    return {
      statusCode: 500,
      body: `malformed URL`
    };
  }
};

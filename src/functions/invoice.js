var options = [
  "scale=" + 2,
  "margin.bottom=" + 10,
  "margin.left=" + 10,
  "margin.right=" + 10,
  "margin.top=" + 15,
  "format:" + 'A4'
];

exports.handler = async (event, context) => {
  const path = event.path.split('/');
  const token = path[path.length - 1];

  if (path.length > 2 && token.indexOf('eyJ') >= 0 && (process.env.ENV === 'development' || !!event.headers.referer)) {

    let url;
    if (process.env.ENV === 'development') {
      url = 'http://localhost:8080/' +
            `?url=http://${ event.headers.host }/invoice/${ token }` +
            '&' + options.join('&');
    } else {
      url = 'https://url-to-pdf.acrabadabra.com/' +
            `?url=http://${ event.headers.referer.split('/')[2] }/invoice/${ token }` +
            '&' + options.join('&') + '&api=' + process.env.PDF_API_KEY;
    }
    console.log(url);

    return {
      statusCode: 307,
      body: '',
      headers: {
        Location: url
      }
    }
  } else {
    console.log(path);
    return {
      statusCode: 500,
      body: JSON.stringify(event, undefined, 2) //`malformed URL`
    };
  }
};

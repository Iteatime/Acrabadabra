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

    return {
      statusCode: 307,
      body: '',
      headers: {
        Location: `${ process.env.service_url }?url=${ process.env.invoice_url }${ token }&${ options.join('&') }&api=${ process.env.PDF_API_KEY }`
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

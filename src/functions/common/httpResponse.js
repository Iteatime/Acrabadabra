export const HTTP_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_NO_CONTENT = 204;
export const HTTP_BAD_REQUEST = 400;
export const HTTP_METHOD_NOT_ALLOWED = 405;
export const HTTP_SERVER_ERROR = 500;

export default function httpResponse(content, statusCode = 200) {
  let body;
  if (typeof content === 'string') {
    body = content;
  } else if (typeof content === 'undefined') {
    body = '';
  } else {
    body = JSON.stringify(content);
  }

  return {
    statusCode,
    body,
    header: {'Content-Type': 'text/html; charset=utf-8'},
  }
}

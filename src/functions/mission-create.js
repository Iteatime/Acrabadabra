/* code from functions/todos-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */
/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);
/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */

  const eventBody = JSON.stringify(event.body)
  const data = JSON.parse(eventBody)
  const mission = {
    data: JSON.parse(data)
  }
  // {"title":"What I had for breakfast ..","completed":true}
  /* construct the fauna query */
  return client.query(q.Create(q.Ref("classes/missions"), mission))
  .then((response) => {
    console.log("success", response)
    let jsonResponse = JSON.parse(JSON.stringify(response));
    jsonResponse.ref['@ref'].id = cryptr.encrypt(jsonResponse.ref['@ref'].id);
    /* Success! return the response with statusCode 200 */
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(jsonResponse)
    })
  }).catch((error) => {
    console.log("error", error)
    /* Error! return the error with statusCode 400 */
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}

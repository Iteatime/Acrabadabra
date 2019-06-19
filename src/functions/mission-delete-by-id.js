/* code from functions/todos-delete.js */
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);


exports.handler = (event, context, callback) => {
  const id = event.path.match(/([^\/]*)\/*$/)[0];
  const decryptedId = cryptr.decrypt(id)
  console.log(`Function 'mission-delete' invoked. delete id: ${decryptedId}`)
  return client.query(q.Delete(q.Ref(`classes/missions/${decryptedId}`)))
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}

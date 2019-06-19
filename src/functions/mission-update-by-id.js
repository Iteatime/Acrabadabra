/* code from functions/todos-update.js */
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

const Cryptr = require('cryptr');
const cryptr = new Cryptr('hello');

exports.handler = (event, context, callback) => {

  const id = event.path.match(/([^\/]*)\/*$/)[0];
  const data = JSON.parse(event.body)
  data.secret = cryptr.encrypt(id);
  console.log(`Function 'todo-update' invoked. update id: ${id}`)
  return client.query(q.Update(q.Ref(`classes/missions/${id}`), {data}))
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

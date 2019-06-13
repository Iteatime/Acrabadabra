/* code from functions/todos-read.js */
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const id = event.path.match(/([^\/]*)\/*$/)[0];
  console.log(`Function 'mission-read' invoked. Read id: ${id}`)
  return client.query(q.Get(q.Ref(q.Class("missions"), id)))
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

// client.query(q.Get(q.Ref(q.Class("posts"), "192903209792046592")))
//   .then((ret) => console.log(ret))


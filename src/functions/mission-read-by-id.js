/* code from functions/todos-read.js */
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const id = '234316534878568967'
  console.log(`Function 'todo-read' invoked. Read id: ${id}`)
  return client.query(q.Get(q.Ref(q.Class("missions"), "234316534878568967")))
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


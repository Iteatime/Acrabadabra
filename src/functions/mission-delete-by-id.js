/* code from functions/todos-delete.js */
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})


exports.handler = (event, context, callback) => {
  // const Id = getId(event.path)
  const stringifiedEvent = event.path.match(/([^\/]*)\/*$/)[0]
  const id = stringifiedEvent
  console.log(`Function 'mission-delete' invoked. delete id: ${id}`)
  return client.query(q.Delete(q.Ref(`classes/missions/${id}`)))
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

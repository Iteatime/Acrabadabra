import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

exports.handler = (event, context, callback) => {
  console.log("Function `missions-read-all` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all_missions"))))
  .then((response) => {

    const missionRefs = response.data
    // create new query out of todo refs. http://bit.ly/2LG3MLg
    const getAllTodoDataQuery = missionRefs.map((ref) => {
      let object = q.Get(ref);
      return object;
    })
    // then query the refs
    return client.query(getAllTodoDataQuery).then((ret) => {

      let list = JSON.parse(JSON.stringify(ret))

      list.forEach(object => {
        object.ref['@ref'].id = cryptr.encrypt(object.ref['@ref'].id);
      });

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(list)
      })
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}

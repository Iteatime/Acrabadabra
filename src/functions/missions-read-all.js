import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log("Function `missions-read-all` invoked");
  let id;
  let match = event.path.match(/\/.+\/(.+)$/);
  if (match) {
    id = match[1];
  }
  console.log(`captured id = ${id}`);


  if (id) {
    return client.query(q.Paginate(q.Match(q.Index("mission_by_missionCreator"), id)))
    .then((response) => {
      const missionRefs = response.data;
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getQuery = missionRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    });
  } else {
    return client.query(q.Paginate(q.Match(q.Ref("indexes/all_missions"))))
    .then((response) => {
      const missionRefs = response.data;
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getQuery = missionRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getQuery).then((ret) => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
    }).catch((error) => {
      console.log("error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    });
  }
}

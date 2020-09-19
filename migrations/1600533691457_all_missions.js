module.exports.up = q => {
  return q.CreateIndex({
    name: "all_missions",
    source: q.Collection('missions')
  })
}

module.exports.down = q => {
  return q.Delete(q.Index('all_missions'))
}

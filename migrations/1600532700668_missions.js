module.exports.up = q => {
  return q.CreateCollection({ name: 'missions' })
}

module.exports.down = q => {
  return q.Delete(q.Collection('missions'))
}

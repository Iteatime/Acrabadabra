module.exports.up = q => {
  return q.CreateIndex({
    name: "mission_by_missionCreator",
    source: q.Collection('missions'),
    terms: [{ field: ['data', 'missionCreator'] }]
  })
}

module.exports.down = q => {
  return q.Delete(q.Index('mission_by_missionCreator'))
}

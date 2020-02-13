const ids = require('../lib/identities.js')
const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    var identity = args[0]

    if(!identity) {
        callback('Invalid syntax. Use the following syntax for this command: `info {characters}`', null)
        return
    }

    var data = ids.getIdentity(guild, identity)
    var currentRank = ranks.getRankAtValue(guild, data.value)

    callback(null, `**${data.identity}** - ${currentRank.rank} - ${data.value}`)
}
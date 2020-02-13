const ids = require('../lib/identities.js')
const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }

    var resp = []

    var list = ids.getAllIdentities(guild)

    for(var i = 0; i < list.length; i++) {
        var currentRank = ranks.getRankAtValue(guild, list[i].value)
        resp.push(`**${list[i].identity}** - ${currentRank.rank} - ${list[i].value}`)
    }

    callback(null, resp.join('\n'))
}
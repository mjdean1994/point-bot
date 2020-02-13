const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }
    
    var resp = []

    var list = ranks.getAllRanks(guild)

    for(var i = 0; i < list.length; i++) {
        resp.push(`**${list[i].rank}** - ${list[i].value}`)
    }

    callback(null, resp.join('\n'))
}
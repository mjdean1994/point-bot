const ids = require('../lib/identities.js')
const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }
    
    var identities = args[1].split(',')
    var value = args[0]

    if(!identities || !value) {
        callback('Invalid syntax. Use the following syntax for this command: `set {value} {characters}`', null)
        return
    }

    var valueInt = parseInt(value.trim())

    if(!valueInt) {
        callback('Invalid point value. Must be a whole number.', null)
        return
    }

    var resp = []

    for(var i = 0; i < identities.length; i++) {
        var element = identities[i].toLowerCase()
        ids.setIdentity(guild, element, valueInt)
        var currentRank = ranks.getRankAtValue(guild, valueInt)
        resp.push(`Set **${element}**'s points to **${valueInt}**. They are now rank **${currentRank.rank}**.`)
    }

    callback(null, resp.join('\n'))
}
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
        callback('Invalid syntax. Use the following syntax for this command: `subtract {value} {characters}`', null)
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
        var current = ids.getIdentity(guild, element).value
        var newValue = current - valueInt
        ids.setIdentity(guild, element, newValue)
        resp.push(`Removed **${value}** points to **${element}**. They now have **${newValue}** ${newValue === 1 ? 'point' : 'points'}`)

        var currentRank = ranks.getRankAtValue(guild, current)
        var newRank = ranks.getRankAtValue(guild, newValue)

        if(currentRank.rank !== newRank.rank) {
            resp.push(`**${element}** is now rank **${newRank.rank}**.`)            
        }
    }

    callback(null, resp.join('\n'))
}
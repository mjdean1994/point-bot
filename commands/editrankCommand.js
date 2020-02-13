const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }
    
    var name = args[0].toLowerCase()
    var value = args[1]

    if(!name || !value) {
        callback('Invalid syntax. Use the following syntax for this command: `editrank {rank} {value}`', null)
        return
    }

    var valueInt = parseInt(value.trim())

    if(!valueInt) {
        callback('Invalid point value. Must be a whole number.', null)
        return
    }

    console.log(name)
    var existing = ranks.getRank(guild, name)

    console.log(existing)

    if(existing.rank === 'Unranked') {
        callback('Cannot edit rank as it does not exist!', null)
        return
    }

    ranks.setRank(guild, name, value)    

    callback(null, `Updated rank **${name}** to value **${value}**.`)
}
const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }
    
    var name = args[0].toLowerCase()
    var value = args[1]

    if(!name || !value) {
        callback('Invalid syntax. Use the following syntax for this command: `addrank {rank} {value}`', null)
        return
    }

    var valueInt = parseInt(value.trim())

    if(!valueInt) {
        callback('Invalid point value. Must be a whole number.', null)
        return
    }

    var existing = ranks.getRank(guild, name)

    console.log(existing)

    if(existing.rank !== 'Unranked') {
        callback('Cannot add rank as it already exists!', null)
        return
    }

    ranks.setRank(guild, name, value)    

    callback(null, `Added rank **${name}** at value **${value}**.`)
}
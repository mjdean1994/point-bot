const ranks = require('../lib/ranks.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }
    
    var name = args[0].toLowerCase()
    if(!name) {
        callback('Invalid syntax. Use the following syntax for this command: `removerank {rank}`', null)
        return
    }

    var existing = ranks.getRank(guild, name)

    console.log(existing)

    if(existing.rank === 'Unranked') {
        callback('Cannot remove rank as it does not exist!', null)
        return
    }

    ranks.removeRank(guild, name)    

    callback(null, `Removed rank **${name}**.`)
}
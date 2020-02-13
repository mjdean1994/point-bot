const ids = require('../lib/identities.js')

module.exports = function(guild, args, isAdmin, callback) {
    if(!isAdmin) {
        callback('This command is only usable by those with the **PointBotAdmin** role.', null)
        return
    }
    
    var identity = args[0]

    if(!identity) {
        callback('Invalid syntax. Use the following syntax for this command: `remove {characters}`', null)
        return
    }

    ids.removeIdentity(guild, identity)

    callback(null, `Removed all data for **${identity}**.`)
}
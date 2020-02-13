const fs = require('fs')

module.exports.getAllIdentities = function(guild) {
    var guildData = getGuildData(guild)

    if(guildData.length == 0) {
        return []
    }

    return guildData.sort((a,b) => { return b.value - a.value })
}

module.exports.getIdentity = function(guild, identity) {
    var guildData = getGuildData(guild)
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].identity === identity) {
            return guildData[i]
        }
    }

    return {identity: identity, value: 0}
}

module.exports.removeIdentity = function(guild, identity) {
    var guildData = getGuildData(guild)
    var newGuildData = []
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].identity !== identity) {
            newGuildData.push(guildData[i])
        }
    }

    setGuildData(guild, newGuildData)
}

module.exports.setIdentity = function(guild, identity, value) {
    var guildData = getGuildData(guild)
    var found = false
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].identity === identity) {
            found = true
            guildData[i].value = value
        }
    }

    if(!found) {
        guildData.push({identity: identity, value: 0})
    }

    setGuildData(guild, guildData)
}

var getData = function() {
    try {
        var file = fs.readFileSync('./data/identities.json', 'utf-8')
        return JSON.parse(file)
    } catch (ex) {
        return {}
    }
    
}

var getGuildData = function(guild) {
    var data = getData()
    if(!data[guild]) {
        return []
    }

    return data[guild]
}

var setData = function(data) {
    fs.writeFileSync('./data/identities.json', JSON.stringify(data))
}

var setGuildData = function(guild, guildData) {
    var data = getData()
    data[guild] = guildData
    setData(data)
}
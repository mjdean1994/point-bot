const fs = require('fs')

const unranked = {
    rank: 'unranked',
    value: 0
}

module.exports.getAllRanks = function(guild) {
    var guildData = getGuildData(guild)

    if(guildData.length == 0) {
        return []
    }

    return guildData.sort((a,b) => { return b.value - a.value })
}

module.exports.getRank = function(guild, rank) {
    var guildData = getGuildData(guild)
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].rank === rank) {
            return guildData[i]
        }
    }

    return unranked
}

module.exports.getRankAtValue = function(guild, value) {
    var guildData = getGuildData(guild)
    guildData.sort((a,b) => {
        return a.value - b.value
    })

    var candidate = unranked
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].value <= value) {
            candidate = guildData[i]
        }
    }

    return candidate
}

module.exports.removeRank = function(guild, rank) {
    var guildData = getGuildData(guild)
    var newGuildData = []
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].rank !== rank) {
            newGuildData.push(guildData[i])
        }
    }

    setGuildData(guild, newGuildData)
}

module.exports.setRank = function(guild, rank, value) {
    var guildData = getGuildData(guild)
    var found = false
    for(var i = 0; i < guildData.length; i++) {
        if(guildData[i].rank === rank) {
            found = true
            guildData[i].value = value
        }
    }

    if(!found) {
        guildData.push({rank: rank, value: value})
    }

    setGuildData(guild, guildData)
}

var getData = function() {
    try {
        var file = fs.readFileSync('./data/ranks.json')
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
    fs.writeFileSync('./data/ranks.json', JSON.stringify(data))
}

var setGuildData = function(guild, guildData) {
    var data = getData()
    data[guild] = guildData
    setData(data)
}
const discord = require("discord.js");

const config = require("./config.json");

var client = new discord.Client();
client.login(config.token);

client.on("ready", function () {
    console.log("Point Bot is up and running!");
    client.user.setGame("World of Warcraft");
});

client.on("message", message => {
    // Ignore all messages that don't begin with bot prefix
    if (!message.content.startsWith(config.prefix)) return;

    if (message.guild == null) {
        message.channel.send("Whoa! Don't slide into my DMs. I only work on servers.");
        return;
    }

    // Split bot command into primary command and arguments, excluding prefix
    var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();

    var allowedRole = message.guild.roles.find(role => role.name == 'PointBotAdmin')
    if(!allowedRole) {
        message.channel.send('Cannot process command: **PointBotAdmin** role does not exist on this server.')
        return
    }
    var isAdmin = message.member.roles.has(allowedRole.id)

    try {
        require(`./commands/${command}Command.js`)(message.guild, args, isAdmin, (err, resp) => {
            if(err) {
                message.channel.send(`[ERROR] ${err}`)
                return
            }

            message.channel.send(resp)
        })
    } catch (ex) {
       console.log(`Unknown command: ${command}: ${ex}`)
    }
});
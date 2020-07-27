const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("Hi nerd.");


}

module.exports.help = {
    name: "hallo"
}
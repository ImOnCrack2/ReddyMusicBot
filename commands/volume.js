const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry, but ur not in the same channel as me.");

    if(isNaN(args[0]) || args[0] > 150 || args[0] < 0 ) return message.reply("Please specify a number between 0 and 150");

    guildIDData.dispatcher.setVolume(args[0] / 100);


    return message.channel.send(`Volume changed to ${args[0]}`);


}

module.exports.help = {
    name: "volume"
}
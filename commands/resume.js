const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry, but ur not in the same channel as me.");

    if(!guildIDData.dispatcher.paused) return message.channel.send("The music is not paused");

    guildIDData.dispatcher.resume();

    return message.channel.send(":arrow_forward: Music resumed");

}

module.exports.help = {
    name: "resume"
}
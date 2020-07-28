const discord = require("discord.js");
const ytdl = require("ytdl-core");


module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.reply("Please join a voice channel first.");

    if(message.guild.me.voice.channel) return message.channel.send("Sorry, but im already in a voice channel.");

    var channelVoice = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;

    var channelVoice = client.guilds.me.voice.channel;

    if(channelVoice) channelVoice.join();
    message.channel.send(":thumbsup: Joined voice channel.");

}
module.exports.help = {
    name: "join"
}
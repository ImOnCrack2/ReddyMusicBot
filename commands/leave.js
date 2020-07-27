const discord = require("discord.js");
const ytdl = require("ytdl-core");


module.exports.run = async (client, message, args) => {

    if(!message.member.voice.channel) return message.reply("Please join a voice channel first.");

    if(!message.guild.me.voice.channel) return message.channel.send("Sorry, but im not in a voice channel.");
    if (message.guild.me.voice.channelID != message.member.voice.channelID) return message.channel.send("Sorry, but im not connected to the same voice channel as you!");

    message.guild.me.voice.channel.leave();
    message.channel.send(":mailbox_with_no_mail:Left voice channel.");

}
module.exports.help = {
    name: "leave"
}
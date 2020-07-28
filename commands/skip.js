const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if (!guildIDData) return message.channel.send("There is no music playing at the moment");

    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry, but ur not in the same channel as me.");

    if(message.member.hasPermission("KICK_MEMBERS")){

        message.channel.send("Going to the next song...");

        return guildIDData.dispatcher.emit("finish");


    }

    var amountUsers = message.member.voice.channel.members.size;

    var amountSkips = Math.ceil(amountUsers / 2);

    if(!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

    if(guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send("Sorry, u already skipped once.");

    guildIDData.queue[0].voteSkips.push(message.member.id);
    options.active.set(message.guild.id, guildIDData);

    if(guildIDData.queue[0].voteSkips.length >= amountSkips){
        message.channel.send("Going to the next song...");

        return guildIDData.dispatcher.emit("finish");
    }

    message.channel.send(`Added from skip request: ${guildIDData.queue[0].voteSkips.length}/${amountSkips}`);


}

module.exports.help = {
    name: "skip"
}
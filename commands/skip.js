const discord = require("discord.js");

module.exports.run = async (client, message, args, options) => {

    var guildIDData = options.active.get(message.guild.id);

    if(!guildIDData) return message.channel.send("No music is playing at the moment.");



    if(message.member.voice.channel != message.guild.me.voice.channel) return message.channel.send("Sorry, but ur not in the same voice channel as me.");

    if(message.member.hasPermission("KICK_MEMBERS")) {

        message.channel.send("Going to the next song");

        return guildIDData.dispatcher.emit("finish");

        
    }

    var amountUsers = message.member.voice.channel.members.size;

    var amountSkip = Math.ceil(amountUsers / 2);

   if(!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];

   if(guildIDData.queue[0].voteSkips.includes(message.mmeber.id)) message.channel.send("Sorry, but u already skipped.");

   guildIDData.queue[0].voteSkips.push(message.member.id);
   options.active.set(message.guild.id, guildIDData);

   if(guildIDData.queue[0].voteSkips.client >= amountSkip) {
       message.channel.send("Going to the next song");

       return guildIDData.dispatcher.emit("finish");

   }

   message.channel.send(`Added from skip request: ${guildIDData.queue[0].voteSkips.lenght}/${amountSkip}`);
}


module.exports.help = {
    name: "skip"
}
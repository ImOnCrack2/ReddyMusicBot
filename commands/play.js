const discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args, options) => {

    if(!message.member.voice.channel) return message.reply("Please join a voice channel first.");

    //if(message.guild.me.voice.channel) return message.channel.send("Sorry, but im already connected to a voice channel.");

    if(!args[0]) message.reply("Please specify a url.");

    var validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("Please specify a __**valid**__ url.")

    var info = await ytdl.getInfo(args[0]);
    
    var data = options.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voice.channel.join();
    
    if(!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({

        songTitle: info.videoDetails.title,
        requester: message.author.id,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) {
        Play(client, options, data);
    }else {
        message.channel.send(`Added to the queue: ${info.videoDetails.title} | Requested by: ${message.author.tag}`);
    }

    options.active.set(message.guild.id, data);

    //var options = {seek: 3, volume: 1};

    //var channelJoin = message.member.voice.channel.join()
      //  .then(voiceChannel => {
//
  //          var stream = ytdl(args[0], {filter: 'audioonly'});
    //        var dispatcher = voiceChannel.play(stream, options);
      //  }).catch(console.error);
//
  //  message.channel.send(`Playing:notes: **${info.videoDetails.title}**`);
        


}


async function Play(client, ops, data) {

    client.channels.cache.get(data.queue[0].announceChannel).send(`Now playing: ${data.queue[0].songTitle} - Requested by: ${data.queue[0].requester}`);

    var options = {seek: 3, volume: 1, bitrate: 128000};
    
    data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: 'audioonly'}), options);

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function () {
        Finish(client, ops, this);
    });
}


function Finish(client, ops, dispatcher){

    var fetchedData = ops.active.get(dispatcher.guildID);
    
    fetchedData.queue.shift();


    if(fetchedData.queue.lenght > 0) {

        ops.active.set(dispatcher.guildID, fetchedData);

        Play(client, ops, fetchedData);

    }else {

        ops.active.delete(dispatcher.guildID);

        var voiceChannel = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;

        if(voiceChannel) voiceChannel.leave();
    }
}



module.exports.help = {
    name: "play"
}
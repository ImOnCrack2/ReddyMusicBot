const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var helpEmbed = new discord.MessageEmbed()
    .setTitle("Help command :carrot:")
    .setColor(0x00AE86)
    .setDescription(" **Normal commands :boy:** \n /ping - shows latency \n /help = shows this command \n \n **Music Commands :notes:** \n /play (yturl) - plays a song \n /leave - let the bot leave \n /queue - shows the queue of songs \n /skip - skips a song ")
    .setFooter("© ReddyMusic")
    .setTimestamp()
    message.channel.send(helpEmbed)


}

module.exports.help = {
    name: "help"
}
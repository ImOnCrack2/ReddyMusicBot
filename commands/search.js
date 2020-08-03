const discord = require("discord.js");
const search = require("yt-search");
module.exports.run = async (client, message, args, ops) => {

    search(args.join(" "), function (res){


        var vids = res.vids.slice(0,10);

        var response = "";

        for(var vid in videos){
            response += `**[${parseInt(vid) + 1}]:** ${vids[vid].title} \r\n`;
        }

        response += `Please choose a number between 0 and ${vids.length}`

        message.channel.send(response);


        const filter = music => !isNaN(music.content) && music.content < vids.length + 1 && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.vidas = vids;

        collection.once("collect", function (musica){

            var commandFile = require("./play.js");

            commandFile.run(client, message, [this.vidas[parseInt(musica.content) -1].url], ops);

        });




    });


    
    


}

module.exports.help = {
    name: "search"
}
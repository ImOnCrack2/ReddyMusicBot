const discord = require("discord.js");
const botConfig = require("./botConfig.json")
const fs = require("fs")
const activeSongs = new Map();

const client = new discord.Client();
client.login(procress.env.token);
client.commands = new discord.Collection()


fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("Cant find any files")
        return;
    }

    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} is vibin with my music`)

        client.commands.set(fileGet.help.name, fileGet);
    })

});


client.on('ready', async () => {
    console.log(`Im vibin with my music`);
    client.user.setActivity("Music", { type: "LISTENING"})
});

client.on("message", async message =>{

    if(message.author.bot) return;
    

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    var options = {
        active: activeSongs
    };

    
    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client, message, args, options);

});
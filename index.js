const discord = require("discord.js");
const botConfig = require("./botConfig.json")
const fs = require("fs")
const activeSongs = new Map();
const activities_list = [
    "/help", 
    "/help | Music"
    ];

const client = new discord.Client();
client.login(process.env.token);
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
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: "LISTENING" }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000);
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
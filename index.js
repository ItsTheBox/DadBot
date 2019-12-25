const Discord = require('discord.js'); //Things to make Discord integration work.
const client = new Discord.Client(); 
const token = ; //Token to allow project to log into bot
const PREFIX = '%'; //Command prefix.
var version = "0.0.8"

client.login(token); //Login to Discord services.

client.on('ready', () =>{
     console.log('Putting on Cargo Shorts...'); //Ensure bot is functional and online

client.user.setActivity('DadBot Development', {type: "WATCHING"}).catch(console.error);

//Begin welcome listener.

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(ch => ch.name === 'auto-gen-spam');
    if (!channel) return;
        channel.send('On behalf of Dad himself, welcome to the server ' + (member) + '!');
});
})

client.on('message', msg=>{ //Basic commands for bot.
   
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'ping':
            msg.channel.send('Go ask your mother.')
            break;
        case 'website':
            msg.channel.send('As requested, the website for my creator is itsthebox.net :)')
            break;
        case 'info':
            if(args[1] === 'version'){
                msg.channel.send('DadBot is currently on version ' + (version))
            }else{
                msg.channel.send('I am unable to process that request :( Please make sure you provide the correct argument (info, version, etc)')
            }
            break;
        case 'clear':
            if(!args[1]) return msg.reply('please specify the number of messages you would like to be removed.')
            msg.channel.bulkDelete(args[1]);
            break;
        }
    })

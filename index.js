const Discord = require('discord.js'); //Require discord.js so bot can function and integrate with Discord services.
const client = new Discord.Client(); 
const token = ; //Token to allow project to log into bot
const config = require("./config.json");
var version = "0.1.0"

client.login(token); //Login to Discord services.

client.on('ready', () =>{
    console.log(`DadBot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); //Ensure bot is functional and online

    client.user.setActivity(`Being a dad in ${client.guilds.size} server(s)!`);



//Welcome bot

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(ch => ch.name === 'auto-gen-spam');
    if (!channel) return;
        channel.send('On behalf of Dad himself, welcome to the server ' + (member) + '!');
});
})

  
client.on("guildCreate", guild => {
    
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Being a dad in ${client.guilds.size} servers(s)!`);
  });
  
  client.on("guildDelete", guild => {
    
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Being a dad in ${client.guilds.size} servers(s)!`);
  });
  
  
  client.on("message", async message => {
   
    
 
    if(message.author.bot) return;
    
  
    if(message.content.indexOf(config.prefix) !== 0) return;
    

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    //Info

    if(command == "info"){
        return message.reply("Hi! I'm DadBot :man: Currently, I am running on DadBot version " + (version) + ". If you would like to contact my creator, please email frank@itsthebox.net :envelope:" )
    }

    //Help

    if (command == "help"){
        return message.reply("You can use %command to invoke commands. Administration commands include %kick, %ban, and %purge. You muse have the proper permissions to use these commands! For a list of commands please see _inset Github here_.")
    }

    
   //Ping
    
    if(command === "ping") {

      const m = await message.channel.send("Ping?");
      m.edit(`Complete! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    
    if(command === "say") {
   
      const sayMessage = args.join(" ");

      message.delete().catch(O_o=>{}); 
    
      message.channel.send(sayMessage);
    }
    
    if(command === "kick") {
      
      if(!message.member.roles.some(r=>["Frank"].includes(r.name)) )
        return message.reply("you don't have permission to kick people!");
      
    
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.kickable) 
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
      
     
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
     
      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  
    }
    

    // Can use ["Administrator", "Moderator"] for multiple roles
    if(command === "ban") {
     
      if(!message.member.roles.some(r=>["Frank"].includes(r.name)) )
        return message.reply("you don't have permission to ban people!");
      
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("Please mention a valid member of this server");
      if(!member.bannable) 
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
  
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      
      await member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
    
    //Purging Messages

    if(command === "purge") {
    
    if(!message.member.roles.some(r=>["Frank"].includes(r.name)) )
    return message.reply("you don't have permission to purge messages!");
      
      const deleteCount = parseInt(args[0], 10);
      
      
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("please provide a number between 2 and 100 for the number of messages to delete");
      
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  });

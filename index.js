const Discord = require('discord.js'); //Require discord.js so bot can function and integrate with Discord services.
const client = new Discord.Client(); 
const token = '; //Token to allow project to log into bot
const config = require("./config.json");
var version = "0.1.8"




client.login(token); //Login to Discord services.

client.on('ready', () =>{
    console.log(`DadBot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); //Ensure bot is functional and online

    client.user.setActivity(`Being a dad in ${client.guilds.size} server(s)!`);



//Welcome bot

client.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.find(ch => ch.name === 'welcoming');
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

    // Simple hello reply

    if (command == "hello"){

      const replies = ["I am a bot and I'm digging a hole, diggy diggy hole.", "Hello!", "Greetings!", "Hi, I hope you have a good day, drink water!", ":wave:", "Hello and welcome to my kitchen, where safety is number one priority!"]

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);

    }
    // Single line commands.
    
    //Uptime

    if(command == "uptime"){
        return message.channel.send("Sometimes, I go offline. This is beacuse I am not hosted on a 24/7 uptime server. Soon, I'll be moved to a cloud server so I can perform my fatherly duties around the clock! Thank you for your patience. <3")
    }

    //Info

    if(command == "info"){
        return message.channel.send("Hi! I'm DadBot. Currently, I am running on DadBot version " + (version) + ". If you would like to contact my creator, please email frank@itsthebox.net :envelope:" )
    }

    //Help

    if (command == "help"){
        return message.reply("You can use %command to invoke commands. Administration commands include %kick, %ban, and %purge. You muse have the proper permissions to use these commands!")
    }


    //Easter Eggs

    if (command == "dad"){
      return message.channel.send("Hi! I am DadBot, if you'd like to know more about me, you can try using the commands %birthday or %aboutdad");

    }

    if (command == "favorites"){

      message.channel.send("Here are a few of my favorite things: Astronomy, 8 Bit Tunes, Soup, Breakfast Bagels, Puns, and being Dad :)")
    }

    if (command == "aboutdad"){

      message.channel.send("Hello! I am DadBot, AKA Dad. I am a Discord bot written in JavaScript. It's a neat language that allows me to do many things. I love meeting new people and helping others!");
    }

    if (command == "birthday"){

      message.channel.send("I was born on December 25th, 2019, according to my creator. I enjoy celebrating my birthday with my users and blowing out 64-bit candles.");
    }
    
    if (command == "breakfastbagel"){

      message.channel.send("Huh? Oh! I love breakfast bagels. Mmmmm, cheese, bagel, egg, bacon! Here's a good recipe I like to make from time to time: https://www.dontgobaconmyheart.co.uk/egg-in-a-hole-breakfast-bagel/ ");
    }

    if (command == "eggnog"){

      message.channel.send("Ah yes, a great beverage for all times of year! https://cdn.liquor.com/wp-content/uploads/2016/12/01075123/11-Go-To-Cocktails-for-December-Parties-uncle-angelos-eggnog-720x720-slideshow.jpg");
    }

    if (command == "diggydiggyhole"){

      message.channel.send("I am a dwarf and I'm digging a hole, diggy diggy hole: https://www.youtube.com/watch?v=ytWz0qVvBZ0")
    }

    if (command == "badtake"){

      message.channel.send("I'm sorry, but that definitely isn't it, chief.")
    }
   //Ping
    
    if(command === "ping") {

      const m = await message.channel.send("I am now performing the requested network test, please stand by.");
      m.edit(`Complete! Here are your results: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    
    if(command === "say") {
   
      const sayMessage = args.join(" ");

      message.delete().catch(O_o=>{}); 
    
      message.channel.send(sayMessage);
    }
    
    if(command === "kick") {
      
      if(!message.member.roles.some(r=>["Owner", "Co-Owner", "Administrators", "Moderators", "Frank"].includes(r.name)) )
        return message.reply("you don't have permission to kick people!");
      
    
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.reply("please mention a valid member of this server.");
      if(!member.kickable) 
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
      
     
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided...";
      
     
      await member.kick(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
      message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  
    }
    

    // Can use ["Administrator", "Moderator"] for multiple roles
    if(command === "ban") {
     
      if(!message.member.roles.some(r=>["Owner", "Co-Owner", "Administrators", "Frank"].includes(r.name)) )
        return message.reply("you don't have permission to ban people!");
      
      let member = message.mentions.members.first();
      if(!member)
        return message.reply("please mention a valid member of this server.");
      if(!member.bannable) 
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
  
      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided...";
      
      await member.ban(reason)
        .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
    }
    
    //Purging Messages

    if(command === "purge") {
    
    if(!message.member.roles.some(r=>["Owner","Co-Owner", "Administrators", "Frank"].includes(r.name)) )
    return message.reply("you don't have permission to purge messages!");
      
      const deleteCount = parseInt(args[0], 10);
      
      
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("please provide a number between 2 and 100 for the number of messages to delete. Deleting 50+ messages may take a few seconds. Be patient!");
      
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  });

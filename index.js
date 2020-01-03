const Discord = require('discord.js'); //Require discord.js so bot can function and integrate with Discord services.
const client = new Discord.Client(); 
const token = ''; //Token to allow project to log into bot
const config = require("./config.json");
var version = "0.2.1"




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
    
    //Hosting information

    if(command == "hosting"){
        return message.channel.send("I am hosted on Red Hat Enterprise Linux 8.0.0 within an AWS EC2 instance. This allows me to be online 24/7, so long as Amazon isn't having issues! If you'd like to know more, message my creator, Frank.")
    }

    //Info

    if(command == "info"){
        return message.channel.send("Hi! I'm DadBot. Currently, I am running on DadBot version " + (version) + ". If you would like to contact my creator, please email frank@itsthebox.net :envelope:" )
    }

    //Help

    if (command == "help"){
        return message.reply("You can use %command to invoke commands. Administration commands include %kick, %ban, and %purge. In order to use these commands, you must have the proper server roles! If you are experiencing issues with any commands, please let my creator know!")
    }


    //Easter Eggs and other commands.

    if (command == "dad"){
      return message.channel.send("Hi! I am DadBot, if you'd like to know more about me, you can try using the commands %birthday or %aboutdad. Right now I am a simple bot, and I have lots of room to grow!");

    }

    if (command == "favorites"){

      message.channel.send("Here are a few of my favorite things: Astronomy, 8 Bit Tunes, Soup, Breakfast Bagels, Puns, and being Dad :)")
    }

    if (command == "aboutdad"){

      message.channel.send("Hello! I am DadBot, AKA Dad. I am a Discord bot written in JavaScript. It's a neat language that allows me to do many things. I love meeting new people and helping others! If you'd like to know about MY dad, you can visit itsthebox.net!");
    }

    if (command == "birthday"){

      message.channel.send("I was born on December 25th, 2019, according to my creator. I enjoy celebrating my birthday with my users and blowing out 64-bit candles.");
    }
    
    if (command == "breakfastbagel"){

      message.channel.send("Huh? Oh! I love breakfast bagels. Mmmmm, cheese, bagel, egg, bacon! Here's a good recipe I like to make from time to time: https://www.dontgobaconmyheart.co.uk/egg-in-a-hole-breakfast-bagel/ ");
    }

    if (command == "secret"){

      message.channel.send("Secret unlocked... here's your secret message :) : https://bit.ly/37keT7z");
    }

    if (command == "diggydiggyhole"){ 

      message.channel.send("I am a dwarf and I'm digging a hole, diggy diggy hole: https://www.youtube.com/watch?v=ytWz0qVvBZ0")
    }

    if (command == "badtake"){

      message.channel.send("I'm sorry, but that definitely isn't it, chief.")
    }

    if (command == "egg"){

      const replies = ["Egg salad sandwich. https://www.bordendairy.com/wp-content/uploads/2017/09/Egg_salad_sandwich.png", "Eggs Benedict. https://dinnerthendessert.com/wp-content/uploads/2018/08/Eggs-Benedict-3.jpg", "Fried Egg. https://cookieandkate.com/images/2018/09/crispy-fried-egg-recipe.jpg", "Poached Egg. https://thestayathomechef.com/wp-content/uploads/2014/11/How-To-Poach-Eggs-3.jpg", "Bacon and eggs. https://www.chinovalleyranchers.com/wp-content/uploads/bfi_thumb/Bacon-and-Eggs-33e2tqb6oznh3h0njcix34.jpg"]

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);
            
    }

    if (command == "helpme"){

      const replies = ["Everything will be okay!", "I am here for you.", "Take a deep breath, maybe drink some water! If only I could drink water, alas, I am a bot.", "You can talk to me, I don't judge!", ""]
    }

   //Ping
    
    if(command == "ping") {

      const m = await message.channel.send("I am now performing the requested network test, please stand by.");
      m.edit(`Complete! Here are your results: Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

    //Uptime

    if (command == "uptime"){

      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor (totalSeconds / 60);
      let seconds = totalSeconds % 60;

      let uptime = `${days} days, or ${hours} hours, or ${minutes} minutes and ${seconds} seconds`;

      message.channel.send("I have been online for " + uptime + ". All systems nominal!");
    }
    
    //Used for administrative messages, mostly. Lets me type as the bot.
    if(command === "say") {
   
      const sayMessage = args.join(" ");

      message.delete().catch(O_o=>{}); 
    
      message.channel.send(sayMessage);
    }
    
    if(command === "kick") {
      
      if(!message.member.roles.some(r=>["Owner", "Co-Owner", "Administrators", "Moderators", "Frank"].includes(r.name)) )
        return message.reply("you don't have permission to kick people! I bet you don't even know the shape of Italy!");
      
    
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
        return message.reply("you don't have permission to ban people, good try though!");
      
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
    
    if(!message.member.roles.some(r=>["Owner","Co-Owner", "Frank"].includes(r.name)) )
    return message.reply("you don't have permission to purge messages! You silly goose, you.");
      
      const deleteCount = parseInt(args[0], 10);
      
      
      if(!deleteCount || deleteCount < 2 || deleteCount > 100)
        return message.reply("please provide a number between 2 and 100 for the number of messages to delete. Deleting 50+ messages may take a few seconds. Be patient!");
      
      const fetched = await message.channel.fetchMessages({limit: deleteCount});
      message.channel.bulkDelete(fetched)
        .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
  });



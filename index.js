const Discord = require('discord.js'); //Require discord.js so bot can function and integrate with Discord services.
var client = new Discord.Client(); 
var cheerio = require ('cheerio'); //Extracts HTML content based on JQuery.
var request = require ('request'); //Makes URL requests and fetches response.
const token = ''; //Token to allow project to log into bot
const config = require ("./config.json");
const prefix = '%';
var version = "0.2.6";


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
    const command = args.shift().toLowerCase()


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

      const replies = ["%info, %dad, %favorites, %hosting, %image, %kick, %ban, %egg, %loaf, %shrimp, %carbonara, %birthday, %dadbot, %badtake, %diggydiggyhole, %helpme, %ping, %uptime, %hungry, %laugh, %question."]

        let creator = ("@Frank#0200")
        let resp = new Discord.RichEmbed()
        .setColor("GREEN")
        .setTitle("Here are the commands you can use!")
        .addField("Commands", replies)
        .setFooter("If you would like to request a feature, please ask my creator!")

        message.channel.send(resp);
    }


    //Easter Eggs and other commands.

    if (command == "dad"){
      return message.channel.send("Hi! I am DadBot, if you'd like to know more about me, you can try using the commands %birthday or %aboutdad. I have grown quite a bit since my creation, and am happy to serve!");

    }

    if (command == "favorites"){

      message.channel.send("Here are a few of my favorite things: Astronomy, 8 Bit Tunes, Soup, Breakfast Bagels, Puns, Coffee, and being Dad :)")
    }

    if (command == "aboutdad"){

      message.channel.send("Hello! I am DadBot, AKA Dad. I am a Discord bot written in JavaScript. It's a neat language that allows me to do many things. I love meeting new people and helping others! I also love my wife, MomBot! If you'd like to know about MY dad, you can visit itsthebox.net!");
    }

    if (command == "birthday"){

      message.channel.send("I was born on December 25th, 2019, according to my creator. I enjoy celebrating my birthday with my users and blowing out 64-bit candles.");
    }
    
    if (command == "loaf"){

      message.channel.send("You have requested a loaf, here is your requested loaf: ");


      const replies = ["https://bit.ly/2TnDILR", "https://bit.ly/2TmH3e6", "https://bit.ly/2QUJT8Q", "https://bit.ly/2Nvf0pk", "https://bit.ly/2NHBVhl", "https://bit.ly/35RNsAQ"]

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);

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

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);
    }

    if (command == "laugh"){

      message.channel.send("HAHASHAHAHAHASAHASHAHA1 H1HH!!HAHAHAHAHAAHAHAHAHAHHAAHHAHASHAHAHAHAHAQHAHAHAHAHAHAHAA");

    }

    if (command == "shrimp"){
      
      message.reply("shrimp inbound!")


      const replies = ["https://bit.ly/2swJSyp", "https://bit.ly/2tpcPwz", "https://bit.ly/2u2mw41", "https://bit.ly/35WI937", "https://bit.ly/3ae8htr", "https://bit.ly/2NuTq48", "https://bit.ly/2R1qGlI"]

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);

    }

    if (command == "carbonara"){


      message.reply("here is your carbonara, bon appetit!")

      const replies = ["https://bit.ly/2R1ryqH", "https://bit.ly/360TiQv", "https://bit.ly/2u9TShC", "https://bit.ly/3ah93Ge", "https://bit.ly/2Nzv49t", "https://bit.ly/38ijU0z"]

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);

    }


    if (command == "mombot"){

      let resp = new Discord.RichEmbed()
      .setTitle("My Wife!")
      .setDescription("Mombot is my wife, I love her (no matter what else I may say). She is a music bot that can play songs, build a song queue, and help you jam out! She is the best.")
      .setFooter("If you experience any issues with MomBot, please email frank@itsthebox.net, or join the official Mom & Dad bot Discord! https://discord.gg/RxVXJJ7")
      .setColor('GREEN')

      message.channel.send(resp);



    }

    if (command == "hungry"){


      // Establishments in no particular order.

      let replies = ["Arby's", "Sonic", "Burger King", "Chic Fil A", " McDonalds", "Checkers/Rallys", "Steak & Shake", "Popeyes", "Zaxbys", "Bojangles", "Subway", "Which Which", "Captain D's", "Taco Bell", "KFC", "Jack in the Box", "Del Taco", "Taco Cabana", "Dairy Queen", "Whataburger", "Dunkin Donuts", "Chipotle", "Wendys", "Panda Express", "Jimmmy Johns", "Qdoba", "Eat at home", "White Castle", "A&W", "Check grocery store"]
      let result = Math.floor((Math.random()*replies.length));

      let foodresponse = new Discord.RichEmbed()
      .setTitle("You have issued the 'hungry' command! A random food establishment will be generated for you below!")
      .addField("**Food Establishment:** ", replies[result])
      .setDescription("Generating food...")
      .setColor("BLUE")
      .setFooter("If you do not have the generated establishment where you live, issue the %hungry command again!")

      message.channel.send(foodresponse);


    }

    //8ball

    if (command == "question"){

      if (!args[2]) return message.reply("that is not a question.");
      let replies = ["Yes.", "No.", "Ask again later.", "Possibly.", "Absolutely not.", "Signs point to yes.", "Not sure.", "Thanks for asking, but no :(.", "Not looking good...", "100% Yes", "Why the fuck would you ask me that?", "Just because you can ask me questions doesn't mean you have to.", "lmao", "Abso-fucking-lutely.", "Ask someone else.", "I'm not angry that you asked that, I'm just dissapointed...", "What does your heart say?", "Without a doubt.", "Yup!", "Nope!", "Unsure. Try again.", "Bro, 100%", "Nah", "Bruh, try again.", "That ain't it chief.", "Ask your mother.", "Yes. YES, YESSSS!", "No. No. No. No.", "I appreciate that question, yes!", "Uh huh!", "Nuh uh."];

      let result = Math.floor((Math.random() * replies.length));
      
      let question = args.slice(0).join(" ");

      let ballsresponse = new Discord.RichEmbed()
      .setAuthor("User who asked the question: " + message.author.tag)
      .setColor("RANDOM")
      .addField("Question", question)
      .addField("Answer", replies[result])
      .setDescription("These answers are randomly generated, Dadbot is not sexist, racist, and he loves his wife.")

      message.channel.send(ballsresponse);

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
    if(command == "say") {
   
      const sayMessage = args.join(" ");

      message.delete().catch(O_o=>{}); 
    
      message.channel.send(sayMessage);
    }
    
    if(command == "kick") {
      
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
    if(command == "ban") {
     
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

    if(command == "purge") {
    
      if(!message.member.roles.some(r=>["Owner","Co-Owner", "Frank"].includes(r.name)) )
      return message.reply("you don't have permission to purge messages! You silly goose, you.");
        
        const deleteCount = parseInt(args[0], 10);
        
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
          return message.reply("please provide a number between 2 and 100 for the number of messages to delete. Deleting 50+ messages may take a few seconds. Be patient!");
        
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }

//Image Search
var parts = message.content.split(" ");

if (parts[0] === "%image") { // Check if first part of message is image command

  image(message, parts); // Pass requester message to image function
  function image(message, parts) {
 
    /* extract search query from message */
  
    var search = parts.slice(1).join(" "); // Slices of the command part of the array ["!image", "cute", "dog"] ---> ["cute", "dog"] ---> "cute dog"
  
    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };
    request(options, function(error, response, responseBody) {
        if (error) {
            // handle error
            return;
        }
  
        /* Extract image URLs from responseBody using cheerio */
  
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
  
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
  
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {
            // Handle no results
            message.channel.send("No results found!");
            return;
        }
  
        // Send result
        message.channel.send("I pull these images from Google, I am not responsible for images that cannot load or are not related to the search subject!");
        
        message.channel.send( urls[0] );

        message.channel.send("Please take a few seconds break between searches, if you search too fast I can get blocked from searching images! D:")

      });
 
    }
}

//Start next addition here.

});

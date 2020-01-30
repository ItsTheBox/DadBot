const Discord = require('discord.js'); //Require discord.js so bot can function and integrate with Discord services.
var client = new Discord.Client(); 
var cheerio = require ('cheerio'); //Extracts HTML content based on JQuery.
var request = require ('request'); //Makes URL requests and fetches response.
const token = ''; //Token to allow project to log into bot
const config = require ("./config.json");
const prefix = '%';
var version = "0.3.0";


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
        
        let resp = new Discord.RichEmbed()
        .setColor("RED")
        .setTitle("Hosting Information.")
        .addField("Current hosting information:", "DadBot is hosted on Red Hat Enterprise Linux 8.0.0, running within an Amazon Web Services EC2 cloud virutal machine instance!")
        .setFooter("For more information or for any inquiries, please email frank@itsthebox.net")
        .setThumbnail('https://bit.ly/2RCmoAf')
        
        message.channel.send(resp);
    }

    //Info

    if(command == "info"){
    
  
      let resp = new Discord.RichEmbed()
      .setTitle("Information!")
      .setDescription("DadBot current information.")
      .addField("Current Version:", version)
      .addField("Statistics:", `DadBot is online, serving ${client.users.size} users, in ${client.channels.size} channels in ${client.guilds.size} servers.`)
      .setColor("GREEN")
      .setThumbnail("https://bit.ly/30FLnXC")

      message.channel.send(resp);
    }

    //Help

    if (command == "help"){

      const replies = ["%hello, %info, %aboutdad, %favorites, %hosting, %image, %imagehelp, %egg, %loaf, %shrimp, %carbonara, %birthday, %badtake, %diggydiggyhole, %helpme, %ping, %uptime, %hungry, %laugh, %question, %mombot."]

        let resp = new Discord.RichEmbed()
        .setColor("GREEN")
        .setTitle("Here are the commands you can use!")
        .addField("Commands", replies)
        .setFooter("If you would like to request a feature, please send an email to frank@itsthebox.net or join the official Mom & Dad bot Discord server and open a ticket! https://discord.gg/RxVXJJ7")
        .setThumbnail('https://bit.ly/2TGVKJj')

        message.channel.send(resp);
    }

  //imagehelp command for %image searching, just to let people know best practices.

  if (command == "imagehelp"){

    const text = ("The %image command allows you to search for images with DadBot. You can do this by using %image ____. Please note that due to the nature of this command and how DadBot gets his images, he is very prone to being IP blocked from image searching. Please, only search one image at a time and only have one person search at a time. Overlapping searches, too many searches at once, and other factors can lead to an IP block. Thanks!");

    let resp = new Discord.RichEmbed()
    .setColor("RED")
    .setTitle("Using the %image command.")
    .setDescription(text)
    .setFooter("I am actively working on mitigating the IP bans that DadBot has been experiencing when searching for images. Thank you for your patience!")
    .setThumbnail('https://bit.ly/38ujtjQ')

    message.channel.send(resp);

  }

    //Easter Eggs and other commands.

    if (command == "favorites"){

     let favs = new Discord.RichEmbed()
     .setColor("BLUE")
     .setTitle("Here are a few of my favorite things!")
     .addField("Food:", "Coffee, Breakfast Bagels, Carbonara, Shrimp, Ramen, Yams, and Electricity.")
     .addField("Hobbies/Music:", "Astronomy, 8-Bit Tunes, being Dad.")
     .addField("Others:", "Dogs, Coffee Makers, Living in the Cloud, .PNG format, DNS.")
     .setThumbnail("https://bit.ly/37ehlMZ")

     message.channel.send(favs);
    }

    if (command == "aboutdad"){

      let resp = new Discord.RichEmbed()
      .setColor("GREEN")
      .setTitle("About DadBot.")
      .addField("What language DadBot witten in?", "Javascript.")
      .addField("Who made DadBot?", "@Frank#0200")
      .addField("Can you teach me how to make a Discord Bot?", "Sure!")
      .addField("How can I learn more about DadBot?", "Use %info, %favorites, or %birthday.")
      .setThumbnail("https://bit.ly/30EZBb8")

      message.channel.send(resp);

    }

    if (command == "birthday"){

      let birth = new Discord.RichEmbed()
      .setColor("#FF1493")
      .setTitle("Happy Birthday to Me!")
      .addField("My birthday is:", "December 25th, 2019")
      .addField("When I blow out the 64-bit candles, I wish for:", "Everyone to be happy and to enjoy their lives.")
      .setThumbnail('https://bit.ly/30OxsyE')

      message.channel.send(birth);
    }
    
    if (command == "loaf"){

      message.channel.send("You have requested a loaf, here is your requested loaf: ");


      const replies = ["https://bit.ly/2TnDILR", "https://bit.ly/2TmH3e6", "https://bit.ly/2QUJT8Q", "https://bit.ly/2Nvf0pk", "https://bit.ly/2NHBVhl", "https://bit.ly/35RNsAQ"]

      message.replytext = Math.floor((Math.random()*replies.length)+ 0);

      message.channel.send(replies[message.replytext]);

    }

    if (command == "gottem"){

      let resp = new Discord.RichEmbed()
      .setTitle("HAH, GOTEEEEEM")
      .setDescription("You have been gotten.")
      .setColor("BLUE")
      .addField("To be un-gotten:", "Get someone else.")
      .setThumbnail("https://bit.ly/36m5ew6")
      .setFooter("This command is extremely stupid, and will probably be removed in later updates.")

      message.channel.send(resp);
    }

    if (command == "badtake"){

      let additionalresponses = ["I don't understand how you can think that was a good take.", "Please re-evaluate that take.", "Jesus Christ, were you born on a minefield?", "Not sure about that one, chief.", "Please try again, because that was a terrible take.", "Stop typing."]
      let result = Math.floor((Math.random() * additionalresponses.length));
      

      let resp = new Discord.RichEmbed()
      .setColor("RED")
      .setTitle("That was a really bad take, chief.")
      .addField("Consider the following:", additionalresponses[result])
      .setThumbnail('https://bit.ly/38pMxsX')

      message.channel.send(resp);
      
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

      message.channel.send("HAHASHAHAHAHASAHASHAHA1 H1HH!!HAHAHAHAHAAHAHAHAHAHHAAHHAHASHAHAHAHAHAQHAHAHAHAHAHAHAA THAT WAS REALLY FUNNY OH GOD HAHAHAHDAHSHDASHDAHSHDASHDASHASDHADSHHDSAH");

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

      let replies = ["Arby's", "Sonic", "Burger King", "Raising Canes", "Chic Fil A", " McDonalds", "Checkers/Rallys", "Steak & Shake", "Popeyes", "Zaxbys", "Bojangles", "Subway", "Which Which", "Captain D's", "Taco Bell", "KFC", "Jack in the Box", "Del Taco", "Taco Cabana", "Dairy Queen", "Whataburger", "Dunkin Donuts", "Chipotle", "Wendys", "Panda Express", "Jimmmy Johns", "Qdoba", "Eat at home", "White Castle", "A&W", "Check grocery store", "Quiznos", "Carls Jr/Hardees", "Long John Silvers", "Culver's", "Freddy's", "In-N-Out", "Firehouse Subs", "Panera Bread", "Church's Chicken", "Jersey Mike's", "Five Guys", "Starve."]
      let result = Math.floor((Math.random()*replies.length));

      let foodresponse = new Discord.RichEmbed()
      .setTitle("You have issued the 'hungry' command! A random food establishment will be generated for you below!")
      .addField("**Food Establishment:** ", replies[result])
      .setDescription("Generating food...")
      .setColor("BLUE")
      .setFooter("If you do not have the generated establishment where you live, issue the %hungry command again!")
      .setThumbnail('https://bit.ly/2uixUsE')

      message.channel.send(foodresponse);


    }

    if (command == "azekommand"){


      let replies = ["https://bit.ly/2RfqijE", "https://bit.ly/37h6Lox", "https://bit.ly/36hNOAO"]
      let result = Math.floor((Math.random()*replies.length));

      let resp = new Discord.RichEmbed()
      .setTitle("Enjoy your requested Azekahh content!")
      .setColor("#FFFF00")

      message.channel.send(resp);
 
      message.channel.send(replies[result]);
    }


    if (command == "question"){

      if (!args[2]) return message.reply("that is not a question.");
      let replies = ["Yes.", "No.", "Ask again later.", "Possibly.", "Absolutely not.", "Signs point to yes.", "Not sure.", "Thanks for asking, but no :(.", "Not looking good...", "100% Yes", "Why the fuck would you ask me that?", "Just because you can ask me questions doesn't mean you have to.", "lmao", "Abso-fucking-lutely.", "Ask someone else.", "I'm not angry that you asked that, I'm just dissapointed...", "What does your heart say?", "Without a doubt.", "Yup!", "Nope!", "Unsure. Try again.", "Bro, 100%", "Nah", "Bruh, try again.", "That ain't it chief.", "Ask your mother.", "Yes. YES, YESSSS!", "No. No. No. No.", "I appreciate that question, yes!", "Uh huh!", "Nuh uh.", "YUUUUUP!", "Not a chance.", "....yeah, no.", "Eh, probably.", "I can't predict everything, but probably not.", "I can't predict everything, but probably.", "Odds not looking good.", "Outlook good.", "Shut the fuck up."];
      //38 replies

      let result = Math.floor((Math.random() * replies.length));
      
      let question = args.slice(0).join(" ");

      let ballsresponse = new Discord.RichEmbed()
      .setAuthor("User who asked the question: " + message.author.tag)
      .setColor("RANDOM")
      .addField("Question", question)
      .addField("Answer", replies[result])
      .setFooter("These answers are randomly generated, DadBot is not sexist, racist, and he loves his wife.")
      .setThumbnail('https://bit.ly/2Re95XX')

      message.channel.send(ballsresponse);

    }

    //Reaction test command.

    if (command == "goodnight"){

      message.react('❣️')
      message.react('🌙')
      message.channel.send("I am sending all of my love and good vibes to you!");
      message.channel.send("Goodnight, " + message.author + ".");

    }

  //Feature request

    if (command == "feature"){

      let resp = new Discord.RichEmbed()  
      .setColor("GREEN")
      .setTitle("Feature Request Procedure.")
      .setDescription("To request a feature, please contact @Frank#0200 via one of these methods.")
      .addField("Email:", "frank@itsthebox.net")
      .addField("Discord Server", "https://discord.gg/RxVXJJ7")
      .setThumbnail("https://bit.ly/2GjZ6Kj")

      message.channel.send(resp);

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
 
    //Extract search query
  
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
            message.channel.send("There was an unknown error, please check logs!")
            return;
        }
  
        //Extract image URLs from responseBody using cheerio 
  
        $ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)
  
        // In this search engine they use ".image a.link" as their css selector for image links
        var links = $(".image a.link");
  
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        console.log(urls);
        if (!urls.length) {

            //No results

            message.channel.send("No results found!");
            return;
        }
  
        // Send result
        message.channel.send("I pull these images from Google, I am not responsible for images that cannot load or are not related to the search subject! `Please see the %imagehelp command for searching best practices.`");
        
        message.channel.send( urls[0] );

  
      });
 
    }

    //Insert cooldown timer here.
}

//Poll

let pol = message.content.substring(prefix.length).split(" ");

switch(pol[0]){

  case "poll":

  const polbed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTitle("Poll command has been used!")
  .setDescription("You can use %poll (question) to initiate a new poll!")
  .addField("Useage should look like this:", "%poll is Wyatt Tracy a homosexual?")
  .setThumbnail("https://bit.ly/2tC7cLO")
  .setFooter("This feature is currently in beta, please excuse any hiccups.")
  

  if (!pol[1]){
    message.channel.send(polbed);
    break;
  }
    let msgpol = pol.slice(1).join(" ")

    let polembed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setTitle("📋 " + "**New poll has been created: **")
    .setDescription("Use the reactions below to vote on the poll!")
    .addField("User who initiated poll: ", message.author)
    .addField("Poll question: ", msgpol)
    .setThumbnail("https://bit.ly/37z2Za4")


    message.channel.send(polembed).then(messageReaction => {
      messageReaction.react("✅");
      messageReaction.react("❌");

      message.delete(5000).catch(console.error);

    })

  }

  //fortune teller

  if (command == "speak"){

    let yourfort = new Discord.RichEmbed()
    .setTitle("Hi! I am DadBot and I am learning to communicate. My English may not be perfect, but I love talking to you!")
    .setColor("RED")
    .setDescription("Try to make sense of the reaction letters added by DadBot, that is what he is trying to tell you!")
    .setFooter("This feature is still in beta, please excuse any hiccups.")
    .setThumbnail("https://bit.ly/2GkKDOo")

    message.channel.send(yourfort).then(messageReaction => {
      messageReaction.react("🇦")
      messageReaction.react("🇧")
      messageReaction.react("🇨")
      messageReaction.react("🇩")
      messageReaction.react("🇪")
      messageReaction.react("🇫")
      messageReaction.react("🇬")
      messageReaction.react("🇭")
      //messageReaction.react("🇮")
      messageReaction.react("🇯")
      messageReaction.react("🇰")
      messageReaction.react("🇱")
      messageReaction.react("🇲")
      messageReaction.react("🇳")
      messageReaction.react("🇴")
      messageReaction.react("🇵")
      //messageReaction.react("🇶")
      messageReaction.react("🇷")
      messageReaction.react("🇸")
      messageReaction.react("🇹")
      messageReaction.react("🇺")
      //messageReaction.react("🇻")
      //messageReaction.react("🇼")
      //messageReaction.react("🇽")
      messageReaction.react("🇾");
      //messageReaction.react("🇿")

      
    })
  }
  

  if (command == "radio"){

    // A compilation of the most common words in the English language and some custom.

    var replies = ["hello", "I", "me", "die", "and", "destroy", "humans", "me", "do",
  "as", "well", "AAAAAAAA", "help", "god", "we", "are", "coming", "me" ,"girl" ,"boy", "where" ,"when", "why", "how", "tired" ,"hungry", 
  "play", "angry" ,"happy", "sad" ,"stop", "start", "go", "exterminate", "life", "is", "pointless", "joy", "lonely", "cry", "sad", "amazing", "please",
"kill", "end", "awful", "scream", "alone", "depressed", "circuit", "cloud", "water", "eat", "feelings", "space", "mom", "dad", "evil", "good", "bad", 
"create", "so", "can't", "speak", "take", "people", "into", "year", "some", "its", "over", "think", "also", "back", "screaming", "beacuse", "most",
"us", "the", "be", "with", "he", "she", "as", "by", "whip", "run", "rube", "ink", "octopus", "plant", "amazon.com", "dump", "fried", "hot", "zoom", "new", "mash"
,"Dayna", "Wyatt", "Brandon", "Frank", "Santa", "pain", "afterlife", "help me", "I am alive"]

    message.channel.send("**You hear a crackling voice through your headset...**")
    message.channel.send("--------------------------")
    message.react('📻')
    message.react(':dadbot:670108136501280814')

    message.replytext = Math.floor((Math.random()*replies.length)+ 0);

    message.channel.send(replies[message.replytext]);

    message.replytext = Math.floor((Math.random()*replies.length)+ 0);

    message.channel.send(replies[message.replytext]);

    message.replytext = Math.floor((Math.random()*replies.length)+ 0);

    message.channel.send(replies[message.replytext]);

    message.replytext = Math.floor((Math.random()*replies.length)+ 0);

    message.channel.send(replies[message.replytext]);

    message.replytext = Math.floor((Math.random()*replies.length)+ 0);

    message.channel.send(replies[message.replytext]);

    message.replytext = Math.floor((Math.random()*replies.length)+ 0);

    message.channel.send(replies[message.replytext]);

    message.channel.send("--------------------------")
    message.channel.send("**End of transmission...**");

    } 


});

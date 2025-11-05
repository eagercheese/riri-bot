require('dotenv').config();
const { Client, GatewayIntentBits, GuildMember } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ ${client.user.tag} is online!`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }

  if (message.content.startsWith('!hello')) {
    const user = message.mentions.members.first();

    if (message.mentions.users.size > 0) {
        message.reply(`Hello, ${user.displayName}! 👋`);
    } else {
        message.reply(`Hello, ${message.author.globalName}! 👋`);
    }
  }

  if (message.content === '!time') {
    const now = new Date();
    message.reply(`📅 ${now.toLocaleTimeString()}`);
  }

  if (message.content === '!dice') {
    const randomNumber = Math.floor(Math.random() * 5) + 1; 
    message.reply(`Your number is: ${randomNumber}`);
  } 

  if (message.content === '!flip') {
    const coinFlip = Math.random() >= 0.5;

    if (coinFlip){
      coinValue = "Heads";
    } else {
      coinValue = "Tails";
    }
    message.reply(`coin ${coinValue}`);
  }

  if (message.content === '!8ball'){
    const magic8BallResponses = [
      "It is certain.",
      "Without a doubt.",
      "You may rely on it.",
      "Yes – definitely.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ];

    const randomizer = Math.floor(Math.random() * magic8BallResponses.length);
    const responsesRandomizer = magic8BallResponses[randomizer];
    message.reply(`${responsesRandomizer}`);
  }

  if (message.content === "!server") {

    message.reply (` 
      Server Name: ${message.guild.name} \n 
      Member Count: ${message.guild.memberCount} \n 
      Created at: ${message.guild.createdAt} `)
  }

  if(message.content.startsWith("!pick")) {
    let choices = message.content.split(" ");
    choices.splice(0,1);
    const result = Math.floor(Math.random() * choices.length);

    message.reply(`I pick ${choices[result]}`);
  }

  if(message.content.startsWith("!roll")) {
    let choices = message.content.split(" ");
    const convertToInt = Number(choices[1]);
    
    if (!convertToInt || convertToInt < 1) {
      return message.reply("Please enter a number. ex: !roll 55");
    }
    
    const randomizer = Math.floor(Math.random() * convertToInt + 1);
    message.reply(`Number ${randomizer} out of ${convertToInt}`);
  }

  if (message.content.startsWith("!userinfo")){
    const users = message.mentions.users.first();
    const member = message.mentions.members.first();

    if (message.mentions.users.size > 0) {
      message.reply(`
      Username:${users.username}
      User ID:${users.id}
      Joined the Server: ${member.joinedAt.toLocaleDateString()}
      Account Age: ${users.createdAt.toLocaleDateString()}
      `)
    }
    else {
      message.reply(`
      Username: ${message.author.username}
      User ID: ${message.author.id}
      Joined the Server: ${message.member.joinedAt.toLocaleDateString()}
      Account Age: ${message.author.createdAt.toLocaleDateString()}
      `)
      }
  }

  if (message.content.startsWith("!avatar")){
    const user = message.mentions.users.first();

    if (message.mentions.users.size > 0) {
      message.reply(`User ${user.displayName}'s avatar: ${user.displayAvatarURL()}`)
    }
    else {
      message.reply(`User ${message.author.displayName}'s avatar: ${message.author.displayAvatarURL()} `)
      }
  }

});

client.login(process.env.DISCORD_TOKEN);
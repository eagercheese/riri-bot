// WEEK 1 commands and my approaches into creating them.

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

  // console.log('🔑 Available properties:', Object.keys(message.author)); to know the objects inside author.
   // console.log('🔑 Available properties:', Object.keys(message.guild));

  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }

  if (message.content === '!hello') {
    message.reply(`Hello, ${message.author.globalName}! 👋`);
  }

  if (message.content === '!time') {
    const now = new Date();
    message.reply(`📅 ${now.toLocaleDateString()}`);
  }

  // const now = new Date();
// now.toLocaleString()    // "10/30/2025, 9:20:00 PM"
// now.toLocaleDateString() // "10/30/2025"
// now.toLocaleTimeString() // "9:20:00 PM"
// now.toString()          // "Wed Oct 30 2025 21:20:00 GMT+0800"
// now.toISOString()       // "2025-10-30T13:20:00.000Z"

// if (message.content === '!time') {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   message.reply(`The time is ${hours}:${minutes}`);
// }

  if (message.content === '!dice') {
    const randomNumber = Math.floor(Math.random() * 5) + 1; //Math floor rounds number to the nearest integer && Math.random randomizes number the number you multiple like 7 will be randomized like 0 to 6
    message.reply(`Your number is: ${randomNumber}`); // discord always expects string (must turn the returning value into string)
  } // I can use math.ceil instead to round it up 1 to 6 no need for +1

  if (message.content === '!flip') {
    const coinFlip = Math.floor(Math.random() * 2);
    let coinValue;

    if (coinFlip === 1){
      coinValue = "Heads";
    } else {
      coinValue = "Tails";
    }

    message.reply(`coin ${coinValue}`);
    /* 
      Another approach can be variable = Math.random() >= 0.5;
      const coinFlip = Math.random() >= 0.5; // true or false
        if (coinFlip) {
          coinValue = "Heads";
        } else {
          coinValue = "Tails";
        }
      
    or 
        const coinValue = Math.random() >= 0.5 ? "Heads" : "Tails";
        message.reply(`🪙 ${coinValue}`);

      or create an array of boolean
        variable1 = math.round(math.random());
        variable2 = array[variable1];
    */

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

    const randomizer = Math.floor(Math.random() * responses.length);
    const responsesRandomizer = magic8BallResponses[randomizer];

    message.reply(`${responsesRandomizer}`);
  }

  if (message.content === "!server") {
    /* 
      const dateFormat = server.createdAt.
      year: 'numeric',
      month: 'long',
      day: 'numeric
    */
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
    choices.splice(0, 1);
    const convertToInt = Number(choices);
    console.log(convertToInt);
    let numbers = [];
    
    for (i = 0; i < convertToInt; i++){
      numbers.push(i);
      console.log(numbers);
    }

    const randomizer = Math.floor(Math.random() * numbers.length);
    const responsesRandomizer = numbers[randomizer];

    message.reply(`Number ${responsesRandomizer}`);
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
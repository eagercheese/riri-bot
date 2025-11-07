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

  
});

client.login(process.env.DISCORD_TOKEN);
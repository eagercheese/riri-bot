require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Create bot client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When bot is ready
client.once('ready', () => {
  console.log(`✅ ${client.user.tag} is online!`);
});

// When someone sends a message
client.on('messageCreate', (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // !ping command
  if (message.content === '!ping') {
    message.reply('Pong! 🏓');
  }

  // !hello command
  if (message.content === '!hello') {
    message.reply(`Hello, ${message.author.username}! 👋`);
  }

  // !time command
  if (message.content === '!time') {
    const now = new Date();
    message.reply(`Current time: ${now.toLocaleString()}`);
  }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
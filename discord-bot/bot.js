const Discord = require('discord.js');
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD] });
    // add more intents as needed

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content.startsWith('!advice')) {
    const input = message.content.slice(8);
    const res = await fetch(`https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${input}`);
    const data = await res.json();
    message.reply(data.text);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

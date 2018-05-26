const Discord = require("discord.js");
const ms = require("ms");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

exports.run = async (bot, message, args) => {
    const m = await message.channel.send("<a:cursor:404001393360502805> Pinging...");
    const pingEmbed = new Discord.RichEmbed()
    .setColor('#ffffff')
    .addField("🏓 Pong!", `Latency \`${m.createdTimestamp - message.createdTimestamp}ms\`\n API Latency \`${Math.round(bot.ping)}ms\``)

    m.edit(pingEmbed);
}

module.exports.help = {
    name: "ping"
  }
const Discord = require("discord.js");
const config = require("../botconfig.json");
let version = config.version;
let inline = true

module.exports = {
	name: 'about',
    description: 'Displays info about the bot.',
    aliases: ['info', 'bot', 'botinfo'],
    execute(bot, message, args) {
        let botEmbed = new Discord.RichEmbed()
        .setAuthor("ium", "https://ium-bot.github.io/ium.png")
        .setColor('#000000')
        .setThumbnail("https://ium-bot.github.io/ium.png")
        .setDescription("**Developer**: Tetra#4616 | **Version:** " + config.version + " | **Library:** discord.js\nium is an aesthetic, simple, multi-purpose discord bot that has many commands, ranging from moderation commands to fun commands.")
        .addField("Website", "https://ium-bot.github.io", inline)
        .addField("Invite", "https://ium-bot.github.io/invite", inline)
        .addField("Server", "https://discord.gg/Ac8HYtD", inline)
        .addField("Patreon", "https://www.patreon.com/ium", inline)
        .addField("Links", "[Trello](https://trello.com/b/3kvrAbIV/ium) | [Github](https://github.com/tetra-dev/ium) | [Issues](https://github.com/tetra-dev/ium/issues)");
    
        message.channel.send(botEmbed);
    },
};
    

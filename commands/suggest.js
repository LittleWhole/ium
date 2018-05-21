const Discord = require('discord.js');

module.exports = {
	name: 'suggest',
    description: 'Suggest a command for ium.',
    usage: '<suggestion>',
    args: true,
    execute(bot, message, args){
        let suggestEmbed = new Discord.RichEmbed()
        .setAuthor("Suggestion", "https://ium-bot.github.io/ium.jpg")
        .addField("User", `${message.author.tag}`)
        .addField("Suggestion", `${args.join(" ")}`)
        .setTimestamp();
        bot.channels.filter(c => c.id === '415707252486438913').forEach(channel => channel.send(suggestEmbed));
        message.channel.send(`<:check:314349398811475968> Your suggestion has been sent! Thanks!`);
    },
};
    

const send = require('quick.hook');
const Discord = require('discord.js');
const errors = require("../utils/errors.js")

module.exports = {
	name: 'announce',
    description: 'Makes a rich embed with your announcement in it.',
    aliases: ['announcement'],
    usage: '<announcement>',
    args: true,
    execute(bot, message, args) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "announce");

        let announcement = args.slice(0).join(" ");
        let user = message.mentions.users.first() || message.author;

        message.delete();

        const embed = new Discord.RichEmbed()
        .setAuthor(user.username, user.displayAvatarURL)
        .setTitle("**Announcement**")
        .setColor("#77c9ff")
        .setDescription(`${announcement}`)
        .setFooter(`Announcement by: ${message.author.username}`)
        .setTimestamp();

        message.channel.send(embed);
    },
};
    
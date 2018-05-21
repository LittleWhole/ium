const Discord = require("discord.js")

module.exports = {
	name: 'avatar',
    description: 'Displays an enlarged image of a user\'s avatar, with a direct link to it.',
    aliases: ['pfp', 'profilepicture', 'icon'],
    usage: '<user (optional)>',
    args: false,
    async execute (bot, message, args) {
        let msg = await message.channel.send("<a:loading:393852367751086090> Generating avatar...");
        let mentionedUser = message.mentions.users.first() || message.author;
    
        let avatarEmbed = new Discord.RichEmbed()
        .setImage(mentionedUser.displayAvatarURL)
        .setColor(`RANDOM`)
        .setTitle(`Avatar`)
        .setDescription("[Avatar Link]("+mentionedUser.displayAvatarURL+")")
        .setFooter(`Requested by ${message.author.tag}`);
        message.channel.send(avatarEmbed)
        msg.delete();
    },
};
    

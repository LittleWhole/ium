const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Shows ium\s commands',
    aliases: ['commands'],
	execute(bot, message, args){

        const { commands } = message.client;
		const data = [];

		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            
            const serverEmbed = new Discord.RichEmbed()
            .setColor('#ffffff')
            .setAuthor("ium's commands", "https://ium-bot.github.io/ium.jpg")
            .setColor('#000000')
            .setDescription("Prefix: `ium ` | All commands can be found here: https://ium-bot.github.io/commands")
            .addField("Moderation", "`ban` `clear` `kick` `mute` `poll` `unmute`")
            .addField("Info", "`about` `developer` `discord` `github` `ping` `server` `stats` `user`")
            .addField("Utils", "`announce` `avatar` `date` `define` `dmhelp` `hastebin` `help` `lmgtfy` `ping` `profile` `shorten` `translate` `vote` `weather`")
            .addField("Fun", "`8ball` `bond` `choose` `clap` `dog` `level` `profile` `rate` `reverse` `say` `scale` `wave`")
            .addField("Economy", "`balance` `pay`")
            .addField("Math", "`divide` `exponent` `minus` `sqrt` `times`")
            .setFooter("Type ium dmhelp for more info on commands.");
        
            message.channel.send(serverEmbed);
            return message.channel.send("**Need more help? Join ium's server: **https://discord.gg/Ac8HYtD");
		}
		else {
			if (!commands.has(args[0])) {
				return message.reply('That\'s not a valid command!');
			}

			const command = commands.get(args[0]);

			data.push(`**Name:** ${command.name}`);

			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

			//data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
		}

		message.author.send(data, { split: true })
			.then(() => {
				if (message.channel.type !== 'dm') {
					message.channel.send('I\'ve sent you a DM with all my commands!');
				}
			})
			.catch(() => message.reply('It seems like I can\'t DM you!'));
	},
};

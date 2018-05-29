const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Shows ium\s commands',
    aliases: ['commands'],
	execute(bot, message, args){

        const { commands } = message.client;
		const data = [];

		if (!args.length) {/** 
			data.push('Commands');
			data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`ium help [command name]\` to get info on a specific command!`);*/
            
            const serverEmbed = new Discord.RichEmbed()
            .setColor('#ffffff')
            .setAuthor("ium's commands", "https://ium-bot.github.io/ium.png")
            .setColor('#000000')
            .setDescription("Prefix: `ium ` | All commands can be found here: https://ium-bot.github.io/commands")
            .addField("Moderation", "`addrole` `announce` `ban` `clear` `kick` `mute` `poll` `removerole` `unmute` `warn`")
            .addField("Info", "`about` `deprecated` `developer` `discord` `dmhelp` github` `help` `invite` `patreon` `ping` `stats` `trello` `user` `version` `website`")
            .addField("Utils", "`autouser` `announce` `avatar` `bitcoin` `calc` `crypto` `define` `fortnite` `hastebin` `invites` `jumboemoji` `lmgtfy` `nick` `npm` `say` `server` `shorten` `suggest` `time` `translate` `user` `vote` `weather`")
            .addField("Fun", "`8ball` `asciify` `bond` `bubble` `choose` `clapify` `dab` `draw` `fight` `fliptext` `hug` `joke` `julio` `kill` `level` `literally` `mock` `profile` `quiz` `rate` `reverse` `rps` `sheug` `slap` `tickle` `wur` `yomama`")
            .addField("Economy", "`daily` `balance` `pay`")
			.addField("Image", "`bird` `bunny` `cat` `dab` `dog` `draw` `magik` `meme`")
			.addField("Music", "`join` `pause` `play` `playing` `resume` `skip` `stop` `volume`")
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
			if (command.usage) data.push(`**Usage:** \`ium ${command.name} ${command.usage}\``);

			//data.push(`**Cooldown:** ${command.cooldown || 1} second(s)`);
		}

		message.channel.send(data, { split: true })
			.then(() => {
                //message.channel.send("here are my commands..")
			})
			.catch(() => message.reply('Something went wrong!'));
	},
};

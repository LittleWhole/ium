const Discord = require("discord.js");
const tokens = require("../tokens.json");
const PlexiDevApi = require('plexibotsapi');
const api = new PlexiDevApi(tokens.plexitoken);

module.exports = bot => {

	let users = 0;
    bot.guilds.map(g => users += g.memberCount);

	api.postServers(bot.user.id, bot.guilds.size);
	api.postUsers(bot.user.id, users); // This will run it once first, the setInterval will then run it every 15 minutes.
	setInterval(function() {
	  api.postServers(bot.user.id, bot.guilds.size);
	  api.postUsers(bot.user.id, users);
	}, 900000); // This example posts your user & server counts once every 15 minutes.

	//PuTTy
	console.log(`${bot.user.username} is online`);
	console.log(`${bot.user.tag} running on ${bot.guilds.size} guilds with ${users} users.`);

	
	//Activity
	bot.user.setActivity(`ium help | ${users} users`);

	//Restart Logs
	let restartEmbed = new Discord.RichEmbed()
	.setColor('#f5a3fa')
	.setDescription("ium has **restarted**")
	.setTimestamp();

	bot.channels.filter(c => c.id === '434525130434150400').forEach(channel => channel.send(restartEmbed).then(message => {message.delete(20000)}))

  };
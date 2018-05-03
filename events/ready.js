const Discord = require("discord.js");

module.exports = bot => {
	let users = 0;
    bot.guilds.map(g => users += g.memberCount);

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

	bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(restartEmbed).then(message => {message.delete(20000)}))
  };
module.exports = {
	name: 'ch',
	description: 'For Tetra\'s reference...',
	execute(bot, message, args) {
        message.channel.send(`\`\`\`js\nname: 'help',\ndescription: 'List all of my commands or info about a specific command.',\naliases: ['commands'],\nusage: '[command name]',\ncooldown: 5,\`\`\``);
	},
};
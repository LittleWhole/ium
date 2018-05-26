

const Discord = require("discord.js");

let inline = true;
let volumeValue = 5;
let curSent = 0;

var server;

module.exports = {
    name: 'stop',
    description: 'Stops playing music.',

	async execute(bot, message, args){
        const queue = bot.queue.get(message.guild.id);
		if (!message.member.voiceChannel) return msg.channel.send('**You must be in a voice channel to use this command.**');
		if (!queue) return msg.channel.send('There is nothing playing to stop.');
		queue.songs = [];
        queue.connection.dispatcher.end('Stopped...');
        message.channel.send(':stop_button: Stopped...');
		return;
        
	},
};
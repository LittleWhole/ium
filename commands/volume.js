
const botconfig = require("../botconfig.json");
const tokens = require("../tokens.json");
const index = require("../index.js");
const GOOGLE_API_KEY = tokens.youtubekey;
const Discord = require("discord.js");
const Util = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(GOOGLE_API_KEY);

let inline = true;
let volumeValue = 5;
let curSent = 0;

var server;

module.exports = {
    name: 'volume',
    description: 'Shows/sets the volume of the song.',
    usage: '<volume (optional)>',
	async execute(bot, message, args){

        const queue = this.queue.get(message.guild.id);

		if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!queue) return message.channel.send(`**You must play something to use this command.**`)
		if(!args[0]) return message.channel.send(`The current volume is **${queue.volume}**`)
		if(isNaN(args[0])) return message.channel.send(`**Not a valid number.**`)
		if(args[0] > 10 || args[0] < 0){
			return message.channel.send(`**Your value can only be between 0-10.**`)
		}
		queue.volume = args[0];
		queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
		message.channel.send(`Volume: **${args[0]}**`)
        return;
        
	},
};

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
    name: 'queue',
    description: 'Lists all the songs in the current queue.',
	async execute(bot, message, args){
        var index = 0;

        const voiceChannel = message.member.voiceChannel;
        //const queue = index.queue;
        //const serverQueue = bot.serverQueue;

		//if(!bot.serverQueue) return message.channel.send(`**There are no songs in the queue.**`);
		let queueEmbed = new Discord.RichEmbed()
		.setAuthor(`Queue - ${message.guild.name}`, "https://ium-bot.github.io/ium.jpg")
		.setColor("#bf8aff")
		.setDescription(`${bot.serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`)
		.setFooter(`Now Playing - ${bot.serverQueue.songs[0].title}`);
		return message.channel.send(queueEmbed);
        
	},
};
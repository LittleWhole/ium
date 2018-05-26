
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
    name: 'playing',
    description: 'Shows the current playing song.',
    aliases: ['np', 'nowplaying'],
	async execute(bot, message, args){

        const queue = bot.queue.get(message.guild.id);

        //if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!queue) return message.channel.send(`**There is nothing playing.**`);
		return message.channel.send(`🎶 Now playing - **${queue.songs[0].title}**`);
        
	},
};
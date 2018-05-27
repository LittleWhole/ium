
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
//const serverQueue = bot.queue.get(message.guild.id)
//const queue = new Map ();
//module.exports.queue = index.queue;

let inline = true;
let volumeValue = 5;
let curSent = 0;

var server;

module.exports = {
    name: 'play',
    description: 'Plays the song you search for in the voice channel you are in.',
    usage: '<song>',
    args: true,
    cooldown: 3,
	async execute(bot, message, args){
        const searchString = args.slice(0).join(' ');
        const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = bot.queue.get(message.guild.id);
        const voiceChannel = message.member.voiceChannel;
		if(!voiceChannel) return message.channel.send(`**You must be in a voice channel to play music.**`);
		//if(!args[1]) return message.channel.send(`**Provide a song to play.**`);
		/**
		const permissions = voiceChannel.permissionsFor(bot.user.message);
		if(!permissions.has(`CONNECT`)) {
			return message.channel.send('**I do not have permission to connect to your voice channel.** Make sure that I have the permission, `CONNECT`');
		}
		if(!permissions.has(`SPEAK`)) {
			return message.channel.send('**I do not have permission to speak in your voice channel.** Make sure that I have the permission, `SPEAK`');
		}
		*/

        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, message, voiceChannel, true);
			}
			return message.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);

					let index = 0;
					let selectionEmbed = new Discord.RichEmbed()
					.setAuthor(`Song Selection - Type the value of a song to select a result.`, "https://ium-bot.github.io/ium.png")
					.setColor("#bf8aff")
					.setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
					.setFooter(`Command cancels in 30 seconds.`);
					message.channel.send(selectionEmbed);
					try {
						var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
							maxMatches: 1,
							time: 30000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return message.channel.send(`**Command canceled due to no value or invalid value provided.**`).then(message => {message.delete(20000)});
					}
					const videoIndex = (response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('**I could not obtain any search results.**').then(message => {message.delete(20000)});;
				}
			}

			return handleVideo(video, message, voiceChannel);
		}
        

        async function handleVideo(video, message, voiceChannel, playlist = false) {
            const serverQueue = bot.queue.get(message.guild.id);
            console.log(video);
            const song = {
                id: video.id,
                title: Discord.escapeMarkdown(video.title),
                url: `https://www.youtube.com/watch?v=${video.id}`
            };
            if(!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };
                bot.queue.set(message.guild.id, queueConstruct);
        
                queueConstruct.songs.push(song);
        
                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    play(message.guild, queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`Action unsuccessful - ${error}`);
                    bot.queue.delete(message.guild.id);
                    return message.channel.send(`Action unsuccessful - ${error}`)
                }
            } else {
                serverQueue.songs.push(song);
                console.log(serverQueue.songs)
                if(playlist) return;
                else return message.channel.send(`**${song.title}** has been added to the queue.`)
            }
            return;
        }

        function play(guild, song) {
            const serverQueue = bot.queue.get(guild.id);
            const channelQueue = bot.queue.get(guild.id);
        
            if (!song) {
                serverQueue.voiceChannel.leave();
                bot.queue.delete(guild.id);
                return;
            }
            console.log(serverQueue.songs);
        
            const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
                .on('end', reason => {
                    if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                    else console.log(reason);
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on('error', error => console.error(error));
            dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        
            channelQueue.textChannel.send(`Now playing - **${song.title}**`)
        }
        
            
    },
    
    
};

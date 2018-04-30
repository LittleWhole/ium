const botconfig = require("./botconfig.json");
const tokens = require("./tokens.json");
const GOOGLE_API_KEY = tokens.youtubekey;
const Discord = require("discord.js");
const Util = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const DBL = require("dblapi.js");
const dbl = new DBL(tokens.dbltoken, bot);
const youtube = new YouTube(GOOGLE_API_KEY);
let version = botconfig.version;
let iumics = require("./data/money.json");
let xp = require("./data/xp.json");
let coolDown = new Set();
let coolSeconds = 2;
let inline = true;
let volumeValue = 5;
const queue = new Map ();

const newUsers = new Discord.Collection();
bot.commands = new Discord.Collection();
let prefix = botconfig.prefix;
let ciprefix = prefix.toLowerCase();

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
	  let eventFunction = require(`./commands/${file}`);
	  let eventName = file.split(".")[0];
	  bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
	});
  });


bot.on("ready", () => {

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
});
/** */

bot.on('guildCreate', guild => {

	const verlvl = {
			0: "None",
			1: "Low",
			2: "Medium",
			3: "(╯°□°）╯︵ ┻━┻",
			4: "(ノಠ益ಠ)ノ彡┻━┻"
		}

	let sicon = guild.iconURL;
	let guildEmbed = new Discord.RichEmbed()
	.setAuthor("ium", "https://ium-bot.github.io/ium.jpg")
	.setColor('#f5a3fa')
	.setThumbnail(sicon)
	.setDescription("ium has been **added** to a server :)")
	.addField("Guild", `${guild}`, inline)
	.addField("Users", `${guild.memberCount}`, inline)
	.addField("Owner", guild.owner, inline)
	.addField("Region", guild.region, inline)
	.addField("Roles", guild.roles.size, inline)
	.addField("Channels", guild.channels.size, inline)
	.setFooter(`ID - ${guild.id}`)
	.setTimestamp();

  bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(guildEmbed));
});

bot.on('guildDelete', guild => {
	const verlvl = {
			0: "None",
			1: "Low",
			2: "Medium",
			3: "(╯°□°）╯︵ ┻━┻",
			4: "(ノಠ益ಠ)ノ彡┻━┻"
		}

	let sicon = guild.iconURL;
	let guildEmbed = new Discord.RichEmbed()
	.setColor('#34e7e4')
	.setThumbnail(sicon)
	.setDescription("ium has been **removed** from a server :(")
	.addField("Guild", `${guild}`, inline)
	.addField("Users", `${guild.memberCount}`, inline)
	.addField("Owner", guild.owner, inline)
	.addField("Region", guild.region, inline)
	.addField("Roles", guild.roles.size, inline)
	.addField("Channels", guild.channels.size, inline)
	.setFooter(`ID - ${guild.id}`)
	.setTimestamp();

	bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(guildEmbed));
});

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('Disconnecting...'));

bot.on('reconnecting', () => console.log('Reconnecting...'));

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', "ium-events");
  if (!channel) return;
	//Embed Creation
	let memberEmbed = new Discord.RichEmbed()
	.setColor('#a193ff')
	.setDescription(`**${member}** has joined`)
	.setFooter(`ID - ${member.id}`)
	.setTimestamp();

  channel.send(memberEmbed);
});

bot.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', "ium-events");
  if (!channel) return;
	//Embed Creation
	let memberEmbed2 = new Discord.RichEmbed()
	.setColor('#66545e')
	.setDescription(`**${member}** has left`)
	.setFooter(`ID - ${member.id}`)
	.setTimestamp();

  channel.send(memberEmbed2);
});

/**
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);

	console.log(`User with ID ${vote.user} just voted!`);
	let hookEmbed = new Discord.RichEmbed()
	.setAuthor("ium", "https://ium-bot.github.io/ium.jpg")
	.setColor('#90e386')
	.setDescription("Webhook running at http://" + hook.hostname + ":" + hook.port + ":" + hook.path);

	bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(hookEmbed));
});
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
	let voteEmbed = new Discord.RichEmbed()
	.setAuthor("ium", "https://ium-bot.github.io/ium.jpg")
	.setColor('#f55783')
	.setDescription("User with ID " + vote.user + "just voted! :)")/

	bot.channels.filter(c => c.id === '434521909745549333').forEach(channel => channel.send(voteEmbed));
});
*/

bot.on("message", message => {
	if (message.author.bot) return;

	//XP and Level System
	let xpAdd = Math.floor(Math.random() * 7) + 8;
	//console.log(xpAdd);

	if(!xp[message.author.id]){
	  xp[message.author.id] = {
		xp: 0,
		level: 1
	  };
	}

	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 100;
	xp[message.author.id].xp =  curxp + xpAdd;
	if(nxtLvl <= xp[message.author.id].xp){
	  xp[message.author.id].level = curlvl + 1;
	  let lvlup = new Discord.RichEmbed()
	  .setTitle("You Leveled Up!")
	  .setColor("#FFFFFF")
	  .addField("New Level", curlvl + 1);

	  //message.channel.send(lvlup);
	}
	fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
	  if(err) console.log(err)
	});

	if(message.content.toLowerCase().indexOf(ciprefix) !== 0) return;

  	//Prefix + Command
	let args = message.content.toLowerCase().slice(ciprefix.length).trim().split(/ +/g);
	let command = args.shift().toLowerCase();


	//CoolDown
	if(!message.content.toLowerCase().startsWith(ciprefix)) return;
	if(coolDown.has(message.author.id)){
		message.delete();
		let cooldownEmbed = new Discord.RichEmbed()
		.setAuthor(message.author.username)
		.setColor("#FFFFFF")
		.addField("Cooldown! 🙃", `You must wait **2** seconds between commands.`)
		return message.channel.send(cooldownEmbed).then(message => {message.delete(5000)});
	}
	//if(!message.member.hasPermissions("ADMINISTRATOR")){
		//coolDown.add(message.author.id);
//	}


	//Currency
	if(!iumics[message.author.id]){
		iumics[message.author.id] = {
			iumics: 0
		}
	}

	let iumicAmt = Math.floor(Math.random() * 15) + 1;
	let baseAmt = Math.floor(Math.random() * 15) + 1;

	if(iumicAmt === baseAmt){
		iumics[message.author.id] = {
			iumics: iumics[message.author.id].iumics + iumicAmt
		}
	fs.writeFile("./data/money.json", JSON.stringify(iumics), (err) => {
		if(err) console.log(err)
	});
	let moneyEmbed = new Discord.RichEmbed()
	.setAuthor(message.author.username)
	.setColor("#FFFFFF")
	.addField("💰", `**${iumicAmt}** iumics added!`)

	message.channel.send(moneyEmbed).then(message => {message.delete(8000)});

	}

	//Commands
	try {
	  let commandFile = require(`./commands/${command}.js`);
	  commandFile.run(bot, message, args);
	} catch (err) {
	  //console.error(err);
	}

	setTimeout(() => {
		coolDown.delete(message.author.id)
	}, coolSeconds * 1000)
});

bot.on('message', async (msg) => {
	if(msg.author.bot) return undefined;
	if(!msg.content.startsWith(ciprefix)) return undefined;
	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1].repeat(/<(.+)/g, `$1`)
	const serverQueue = queue.get(msg.guild.id)


	if(msg.content.startsWith(`${ciprefix}play`)) {
		const voiceChannel = msg.member.voiceChannel;
		if(!voiceChannel) return msg.channel.send(`**You must be in a voice channel to play music.**`);
		if(!args[2]) return msg.channel.send(`**Provide a song to play.**`);
		/** 
		const permissions = voiceChannel.permissionsFor(bot.user.msg);
		if(!permissions.has(`CONNECT`)) {
			return msg.channel.send('**I do not have permission to connect to your voice channel.** Make sure that I have the permission, `CONNECT`');
		}
		if(!permissions.has(`SPEAK`)) {
			return msg.channel.send('**I do not have permission to speak in your voice channel.** Make sure that I have the permission, `SPEAK`');
		}
		*/

		try {
			var video = await youtube.getVideo(url);
		} catch (error) {
			try {
				var videos = await youtube.searchVideos(searchString, 1);
				var video = await youtube.getVideoByID(videos[0].id);
			} catch (err) {
				console.error(err);
				return msg.channel.send('I could not obtain any search results.');
			}
		}
		console.log(video);
		const song = {
			id: video.id,
			title: video.title,
			url: `https://www.youtube.com/watch?v=${video.id}`
		};

		if(!serverQueue) {
			const queueConstruct = {
				textChannel: msg.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true
			};
			queue.set(msg.guild.id, queueConstruct);

			queueConstruct.songs.push(song);

			try {
				var connection = await voiceChannel.join();
				queueConstruct.connection = connection;
				play(msg.guild, queueConstruct.songs[0]);
			} catch (error) {
				console.error(`Action unsuccessful - ${error}`);
				queue.delete(msg.guild.id);
				return msg.channel.send(`Action unsuccessful - ${error}`)
			} 
		} else {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs)
			return msg.channel.send(`**${song.title}** has been added to the queue.`)
		}

		return;

	} else if(msg.content.startsWith(`${ciprefix}skip`)) {
		if(!msg.member.voiceChannel) return msg.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return msg.channel.send(`**I cannot skip because nothing is playing.**`)
		serverQueue.connection.dispatcher.end(`Skip Command Used`);
		return;
	} else if(msg.content.startsWith(`${ciprefix}stop`)){
		if(!msg.member.voiceChannel) return msg.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return msg.channel.send(`**I cannot stop because nothing is playing.**`)
		serverQueue.songs = [];
		serverQueue.connections.dispatcher.end(`Stop Command Used`);
		msg.channel.send ("**Stopped**");
		return;
	} else if(msg.content.startsWith(`${ciprefix}volume`)){
		if(!msg.member.voiceChannel) return msg.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return msg.channel.send(`**You must play something to use this command.**`)
		if(!args[2]) return msg.channel.send(`The current volume is **${serverQueue.volume}**`)
		if (isNaN(args[2])) return msg.channel.send(`**Not a valid number.**`)
		serverQueue.volume = args[2];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[2] / 5);
		msg.channel.send(`Volume - **${args[2]}**`)
		return;
	} else if(msg.content.startsWith(`${ciprefix}np`) || msg.content.startsWith(`${ciprefix}playing`) || msg.content.startsWith(`${ciprefix}nowplaying`)){
		//if(!msg.member.voiceChannel) return msg.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return msg.channel.send(`**There is nothing playing.**`);
		return msg.channel.send(`Now playing - **${serverQueue.songs[2].title}**`);
	} else if(msg.content.startsWith(`${ciprefix}queue`)){
		if(!serverQueue) return msg.channel.send(`**There are no songs in the queue.**`);
		let queueEmbed = new Discord.RichEmbed()
		.setAuthor(`Queue - ${msg.guild.name}`, "https://ium-bot.github.io/ium.jpg")
		.setColor("#bf8aff")
		.setDescription(`${serverQueue.songs.map(song => `${song.title}`).join('\n')}`)
		.setFooter(`Now Playing - ${serverQueue.songs[0].title}`);
		return msg.channel.send(queueEmbed);
} /**else if(msg.content.startsWith(`${ciprefix}pause`)){
		if(serverQueue && serverQueue.playing) {
			serverQueue.connection.dispatcher.pause();
			msg.channel.send(`Paused - **${serverQueue.songs[0].title}**`)
			return serverQueue.playing = false;
		} 
		return msg.channel.send(`**There is nothing that is playing to pause.**`);
	} else if(msg.content.startsWith(`${ciprefix}resume`)){
		if(serverQueue && !serverQueue.playing) {
			serverQueue.connection.dispatcher.resume();
			msg.channel.send(`Resumed - **${serverQueue.songs[0].title}**`)
			return serverQueue.playing = true;
		}
		return msg.channel.send(`**There is nothing that is playing to resume.**`);
	}*/

	return;
});

function play(guild, song) {
	const serverQueue = queue.get(guild.id);
	const channelQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
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


bot.login(tokens.token);

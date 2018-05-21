//Check Node Version
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const botconfig = require("./botconfig.json");
const tokens = require("./tokens.json");
const messageSent = require("./data/sent.json");
const errors = require("./utils/errors.js")
const GOOGLE_API_KEY = tokens.youtubekey;
const Discord = require("discord.js");
const Util = require("discord.js");
const childProcess = require("child_process");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const DBL = require("dblapi.js");
const dbl = new DBL(tokens.dbltoken, bot);
const PlexiDevApi = require('plexibotsapi');
const api = new PlexiDevApi(tokens.plexitoken);
const youtube = new YouTube(GOOGLE_API_KEY);
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const Botspace = require('botlist.space');
const botspace = new Botspace(botconfig.iumID, "6c9d38 4TRY THIS TIME :)1a76403b38fc2422e8973d636fbc9c289787a07fb1632000db654b6a19d0cdf");
let version = botconfig.version;
let iumics = require("./data/money.json");
let xp = require("./data/xp.json");
let coolDown = new Set();
let coolSeconds = 2;
let inline = true;
let volumeValue = 5;
let curSent = 0;
const queue = new Map ();


const { Client } = require('idiotic-api');
bot.IdioticAPI = new Client(tokens.token || 'token', { dev: true });

const newUsers = new Discord.Collection();
bot.commands = new Discord.Collection();
let prefix = botconfig.prefix;
let ciprefix = prefix.toLowerCase();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

	/** 
	fs.readdir("./commands/", (err, files) => {
		if (err) return console.error(err);
		files.forEach(file => {
		let eventFunction = require(`./commands/${file}`);
		let eventName = file.split(".")[0];
		bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
		});
	});
	*/
  
const init = async () => {
  const evtFiles = await readdir("./events/");
  //bot.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    bot.on(eventName, event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
}
init();

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('disconnect', () => console.log('Disconnecting...'));

bot.on('reconnecting', () => console.log('Reconnecting...'));



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

botspace.postServerCount(bot.guilds.size).then(() => { 
    console.log('Set the current bot\'s server count to ' + bot.guilds.size + ' guilds.');
}).catch((e) => {
	console.error('Failed to post server count. ' + e.code);
	console.error(e);
});

bot.on("ready", member => {
	/** 
	let users = 0;
    bot.guilds.map(g => users += g.memberCount);
	member.guild.channels.get('447244646306021388').setName(`Servers: ${bot.guilds.size}`);
	member.guild.channels.get('447245206337880075').setName(`Users: ${users}`);
	*/
});

function encode_utf8(s) {
	return unescape(encodeURIComponent(s));
  }
  
  function decode_utf8(s) {
	return decodeURIComponent(escape(s));
  }
  
  const clear = text => {
	if (typeof(text) === "string")
	  return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
  }
  
  bot.on("message", message => {
	const args = message.content.split(" ").slice(1);
  
	if (message.content.startsWith(botconfig.prefix + "exec")) {
	  if(message.author.id !== botconfig.ownerID) return;
	  try {
		const code = args.join(" ");
		let evaled = childProcess.execSync(encode_utf8(code));
  
		console.log(typeof evaled)
		console.log(evaled)
  
		if (typeof evaled !== "string")
		  evaled = evaled.toString();
  
		  let woahembed = new Discord.RichEmbed()
		  .setDescription("Evaluation successful. ")
		  .addField(":inbox_tray: Input:", `\`\`\`sh\n${code}\n\`\`\``)
		  .addField(":outbox_tray: Output:", `\`\`\`sh\n${clear(evaled)}\n\`\`\``)
		  .setColor("#36393e")
		  .setFooter("Evaluation Completed")
		  .setTimestamp();
  
		  message.channel.send(woahembed);
  
	  } catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`sh\n${clear(err)}\n\`\`\``);
	  }
	}
  });


bot.on("message", message => {
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

	if (message.author.bot) return;
	if(message.content.toLowerCase().indexOf(ciprefix) !== 0) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) {
		if (fs.existsSync(`./commands/${commandName}.js`)) {
			try {
				let commandFile = require(`./commands/${commandName}.js`);
				if(commandFile.run)
					commandFile.run(bot, message, args);
			} catch (error) {
				console.error(error);
				message.reply('There was an error trying to execute that command!');
			}
		}
		return;
	}
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments ${message.author}.`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!timestamps.has(message.author.id)) {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	else {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		command.execute(bot, message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}


	/** 
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
	if(!['275831434772742144',].includes(message.author.id)){
		coolDown.add(message.author.id);
	}

	curSent = curSent + 1;
	console.log(`${curSent}`);

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
	*/
});


bot.on('message', async (message) => {
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(ciprefix)) return undefined;
	const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id)

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(ciprefix.length)


	if(message.content.startsWith(`${ciprefix}play`)) {
		const voiceChannel = message.member.voiceChannel;
		if(!voiceChannel) return message.channel.send(`**You must be in a voice channel to play music.**`);
		if(!args[1]) return message.channel.send(`**Provide a song to play.**`);
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
					.setAuthor(`Song Selection - Type the value of a song to select a result.`, "https://ium-bot.github.io/ium.jpg")
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
	} else if(message.content.startsWith(`${ciprefix}skip`)) {
		if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return message.channel.send(`**I cannot skip because nothing is playing.**`)
		serverQueue.connection.dispatcher.end(`Skip Command Used`);
		return;
	} else if(message.content.startsWith(`${ciprefix}volume`)){
		if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return message.channel.send(`**You must play something to use this command.**`)
		if(!args[2]) return message.channel.send(`The current volume is **${serverQueue.volume}**`)
		if(isNaN(args[2])) return message.channel.send(`**Not a valid number.**`)
		if(args[2] > 10 || args[2] < 0){
			return message.channel.send(`**Your value can only be between 0-10.**`)
		}
		serverQueue.volume = args[2];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[2] / 5);
		message.channel.send(`Volume - **${args[2]}**`)
		return;
	} else if(message.content.startsWith(`${ciprefix}np`) || message.content.startsWith(`${ciprefix}playing`) || message.content.startsWith(`${ciprefix}nowplaying`)){
		//if(!message.member.voiceChannel) return message.channel.send(`**You must be in a voice channel to use this command.**`);
		if(!serverQueue) return message.channel.send(`**There is nothing playing.**`);
		return message.channel.send(`🎶 Now playing - **${serverQueue.songs[0].title}**`);
	} else if(message.content.startsWith(`${ciprefix}queue`)){
		let index = 0;
		if(!serverQueue) return message.channel.send(`**There are no songs in the queue.**`);
		let queueEmbed = new Discord.RichEmbed()
		.setAuthor(`Queue - ${message.guild.name}`, "https://ium-bot.github.io/ium.jpg")
		.setColor("#bf8aff")
		.setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`)
		.setFooter(`Now Playing - ${serverQueue.songs[0].title}`);
		return message.channel.send(queueEmbed);
	} else if (message.content.startsWith(`${ciprefix}pause`)) {
		if (serverQueue) {
			serverQueue.connection.dispatcher.pause();
			return message.channel.send(`⏸ Paused - **${serverQueue.songs[0].title}**`);
		}
		return message.channel.send('There is nothing playing to pause.');
	} else if (message.content.startsWith(`${ciprefix}resume`)) {
		if (serverQueue) {
			serverQueue.connection.dispatcher.resume();
			return message.channel.send(`▶ Resumed - **${serverQueue.songs[0].title}**`);
		}
		return message.channel.send('There is nothing playing to resume.');
	}

	return;
});


async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
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
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Action unsuccessful - ${error}`);
			queue.delete(message.guild.id);
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

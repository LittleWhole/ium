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
let version = botconfig.version;
let iumics = require("./data/money.json");
let xp = require("./data/xp.json");
let coolDown = new Set();
let coolSeconds = 2;
let inline = true;
let volumeValue = 5;
let curSent = 0;
//const queue = new Map ();
bot.queue = new Map();

const { Client } = require('idiotic-api');
bot.IdioticAPI = new Client(tokens.token || 'token', { dev: true });

const newUsers = new Discord.Collection();
bot.commands = new Discord.Collection();
let prefix = botconfig.prefix;
let ciprefix = prefix.toLowerCase();

const botStats = {commandsUsed: 0, messagesReceived: 0, messagesSent: 0 }
bot.botStats = botStats

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
  
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

	if (message.author.id === bot.user.id) {
		// Bot Messages Sent (this session)
		bot.botStats.messagesSent = bot.botStats.messagesSent + 1
	} else {
		// Bot Messages Received (this session)
		bot.botStats.messagesReceived = bot.botStats.messagesReceived + 1
	}

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

	if(message.author.id !== '275831434772742144') {
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
	}

	try {
		command.execute(bot, message, args);
		bot.botStats.commandsUsed = bot.botStats.commandsUsed + 1
	}
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}



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

	bot.serverQueue = bot.queue.get(message.guild.id);
	}
});

bot.login(tokens.token);

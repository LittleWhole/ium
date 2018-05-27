const Discord = require('discord.js');
const rps = ["rock", "paper", "scissors"];
let iumics = require("../data/money.json");
const config = require('../botconfig.json');
const fs = require('fs');

module.exports = {
  name: 'rps',
  description: 'Plays a game of rock, paper, scissors with you.',
  aliases: ['rockpaperscissors'],
  args: true,
  usage: ['<rock/paper/scissors>'],
    execute(bot, message, args) {
        if (!iumics[message.member.id]) iumics[message.member.id] = 0;

        let sIumics = iumics[message.author.id].iumics;
        let iumEarn = Math.floor(Math.random() * 60) + 50;
    
        const member = message.member;
        var numb = Math.floor(Math.random() * 150);
        if (numb <= 50 && numb >= 0) {
          var botChoice = "paper";
        } else if (numb >= 100 && numb <= 150) {
          var botChoice = "rock";
        } else if (numb >= 50 && numb <= 100) {
          var botChoice = "scissors";
        }

        var choice = args[0];
        if (choice == "Paper" || choice == "P" || choice == "paper" ) {
            if (botChoice == "scissors") {
                let rpsEmbed4 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Result", `**${botChoice}** beats **${choice}**! I win!`)
                .setFooter(`${message.author.username} +0 iumics`, member.displayAvatarURL);
                return message.channel.send(rpsEmbed4)
              } else if (botChoice == "paper") {
                let rpsEmbed5 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Summary", `**${botChoice}** doesn't beat **${choice}**! It's a tie!`);
                return message.channel.send(rpsEmbed5)
              } else {
                iumics[message.author.id] = {
                    iumics: sIumics + iumEarn
                };
                let rpsEmbed2 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Result", `**${choice}** beats **${botChoice}**! You win!`)
                .setFooter(`${message.author.username} +${iumEarn} iumics`, member.displayAvatarURL);
                return message.channel.send(rpsEmbed2)
              }
        }
        if (choice == "Rock" || choice == "r" || choice == "rock" ) {
            if (botChoice == "scissors") {
                iumics[message.author.id] = {
                    iumics: sIumics + iumEarn
                };
                let rpsEmbed4 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Result", `**${choice}** beats **${botChoice}**! You win!`)
                .setFooter(`${message.author.username} +${iumEarn} iumics`, member.displayAvatarURL);
                return message.channel.send(rpsEmbed4)
              } else if (botChoice == "rock") {
                let rpsEmbed5 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Summary", `**${botChoice}** doesn't beat **${choice}**! It's a tie!`);
                return message.channel.send(rpsEmbed5)
              } else {
                let rpsEmbed2 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Result", `**${botChoice}** beats **${choice}**! I win!`)
                .setFooter(`${message.author.username} +0 iumics`, member.displayAvatarURL);
                return message.channel.send(rpsEmbed2)
              }
        }
        if (choice == "Scissors" || choice == "s" || choice == "scissors" ) {
            if (botChoice == "scissors") {
                let rpsEmbed5 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Summary", `**${botChoice}** doesn't beat **${choice}**! It's a tie!`)
                .setFooter(`${message.author.username} +0 iumics`, member.displayAvatarURL);
                return message.channel.send(rpsEmbed5)
                return message.channel.send(rpsEmbed4)
              } else if (botChoice == "rock") {
                let rpsEmbed5 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Summary", `**${botChoice}** beats **${choice}**! I win!`);
                return message.channel.send(rpsEmbed5)
              } else {
                let rpsEmbed2 = new Discord.RichEmbed()
                .setColor("#f55783")
                .setAuthor(message.author.username)
                .setAuthor("Rock, Paper, Scissors")
                .addField('You Put', choice)
                .addField('I Put', botChoice)
                .addField("Result", `**${choice}** beats **${botChoice}**! You win!`)
                .setFooter(`${message.author.username} +${iumEarn} iumics`, member.displayAvatarURL);
                return message.channel.send(rpsEmbed2)
              }
        }

          /**
          if (botChoice == "scissors") {
            var response = "I'm choosing **Scissors**! :v: I win!"
          } else if (botChoice == "paper") {
            var response = "I'm choosing **Paper**! :hand_splayed: It's a tie!"
          } else {
            var response = "I'm choosing **Rock**! :punch: You win!"
          }
          message.channel.send(response);
        } else if (choice == "rock" || choice == "r") {
          var numb = Math.floor(Math.random() * 100);
          if (numb <= 50) {
            var botChoice = "paper";
          } else if (numb > 50) {
            var botChoice = "rock";
          } else {
            var botChoice = "scissors";
          }
          if (botChoice == "paper") {
            var response = "I'm choosing **Paper**! :hand_splayed: I win!"
          } else if (botChoice == "rock") {
            var response = "I'm choosing **Rock**! :punch: It's a tie!"
          } else {
            var response = "I'm choosing **Scissors**! :v: You win!"
          }
          message.channel.send(response);
        } else if (choice == "scissors" || choice == "s") {
          var numb = Math.floor(Math.random() * 100);
          if (numb <= 50) {
            var botChoice = "paper";
          } else if (numb > 50) {
            var botChoice = "rock";
          } else {
            var botChoice = "scissors";
          }
          if (botChoice == "rock") {
            var response = "I'm choosing **Paper**! :hand_splayed: You win!"
          } else if (botChoice == "scissors") {
            var response = "I'm choosing **Scissors**! :v: It's a tie!"
          } else {
            var response = "I'm choosing **Rock**! :punch: I win!"
          }
          message.channel.send(response); */
	},
};
/**
exports.run = (message, args, bot) => {

    if(!args[0]) return message.channel.send("**Choose Rock, Paper, or Scissors.** `ium rps rock`");
    //if (!rps.includes(args[0].toLowerCase()))
        //return messageUtil.sendError(message.channel, '**You need to use rock, paper, or scissors in order to play** `ium rps rock`');

    if (!iumics[message.member.id]) iumics[message.member.id] = 0;

    let sIumics = iumics[message.author.id].iumics;
    let iumEarn = Math.floor(Math.random() * 60) + 50;

    const botChoice = rps[Math.floor(Math.random() * rps.length)];
    const member = message.member;

    switch (botChoice) {
        case 'rock':
            switch (args[0].toLowerCase()) {
                case 'rock':
                    let rpsEmbed1 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Summary", `${args[0]} doesn't beat ${botChoice}! It's a tie!`);
                    return message.channel.send(rpsEmbed1)
                    break;
                case 'paper':
                    iumics[message.author.id] = {
                        iumics: sIumics + iumEarn
                    };
                    let rpsEmbed2 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Result", `${args[0]} beats ${botChoice}! You win!`)
                    .setFooter(`${message.author.username} +${iumEarn} iumics`, member.displayAvatarURL);
                    return message.channel.send(rpsEmbed2)
                    break;
                case 'scissors':
                    let rpsEmbed3 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Result", `${botChoice} beats ${args[0]}! I win!`)
                    .setFooter(`${message.author.username} +0 iumics`, member.displayAvatarURL);
                    return message.channel.send(rpsEmbed3)
                    break;
            }
            break;
        case 'paper':
            switch (args[0].toLowerCase()) {
                case 'rock':
                    let rpsEmbed4 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Result", `${botChoice} beats ${args[0]}! I win!`)
                    .setFooter(`${message.author.username} +0 iumics`, member.displayAvatarURL);
                    return message.channel.send(rpsEmbed4)
                    break;
                case 'paper':
                  let rpsEmbed5 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Summary", `${args[0]} doesn't beat ${botChoice}! It's a tie!`);
                    return message.channel.send(rpsEmbed5)
                    break;
                case 'scissors':
                    iumics[message.author.id] = {
                        iumics: sIumics + iumEarn
                    };
                    let rpsEmbed6 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Result", `${args[0]} beats ${botChoice}! You win!`)
                    .setFooter(`${message.author.username} +${iumEarn} iumics`, member.displayAvatarURL);
                    return message.channel.send(rpsEmbed6)
                    break;
            }
            break;
        case 'scissors':
            switch (args[0].toLowerCase()) {
                case 'rock':
                    iumics[message.author.id] = {
                        iumics: sIumics + iumEarn
                    };
                    let rpsEmbed7 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Result", `${args[0]} beats ${botChoice}! You win!`)
                    .setFooter(`${message.author.username} +${iumEarn} iumics`, member.displayAvatarURL);
                    return message.channel.send(rpsEmbed7)
                    break;
                case 'paper':
                    let rpsEmbed8 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Result", `${botChoice} beats ${args[0]}! I win!`)
                    .setFooter(`${message.author.username} +0 iumics`, member.displayAvatarURL);
                    return message.channel.send(rpsEmbed8)
                    break;
                case 'scissors':
                    let rpsEmbed9 = new Discord.RichEmbed()
                    .setColor("#f55783")
                    .setAuthor(message.author.username)
                    .setAuthor("Rock, Paper, Scissors")
                    .addField('You Put', args[0], true)
                    .addField('I Put', botChoice, true)
                    .addField("Summary", `${args[0]} doesn't beat ${botChoice}! It's a tie!`);
                    return message.channel.send(rpsEmbed9)
                    break;
            }
            break;
    }

    fs.writeFile("../data/money.json", JSON.stringify(iumics), (err) => {
      if(err) cosole.log(err)
    });
};

module.exports.help = {
    name: 'rps',
};
 */
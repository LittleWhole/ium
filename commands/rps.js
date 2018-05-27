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
    },
};
    
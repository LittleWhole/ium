const Discord = require("discord.js");
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    name: 'joke',
    description: 'Sends a random joke.',
	execute(bot, message, args){
        giveMeAJoke.getRandomDadJoke(function(joke){
            message.channel.send(joke)
        })
	},
};
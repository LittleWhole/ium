const Discord = require("discord.js");
const snekfetch = require('snekfetch');
const request = require("request");

module.exports = {
	name: 'cat',
    description: 'Displays a random picture of a cat.',
    aliases: ['meow'],
    async execute (bot, message, args) {
        request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                return message.channel.send(body);
              }
          });
    },
};
    
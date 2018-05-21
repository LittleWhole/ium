//Command from Waspothegreat#1234
const Discord = require("discord.js");
const request = require("request");

module.exports = {
    name: 'gitSearch',
    description: 'Searches github repo.',
    usage: '<repository>',
    aliases: ['gSearch'],
    args: true,
	execute(bot, message, args){
        message.channel.send("Querying...").then(m => {
            request({uri: `https://github.com/${args}`}, (err, response, body) => {
                if (!err && response.statusCode == 200) {
                    m.edit(`**${args}** => https://github.com/${args}`);
                }
                if (response.statusCode == 404) {
                    m.edit(`**${args}** was not found.`);
                }
                if (err) {
                    m.edit(err);
                }
            });
        });
	},
};
const snekfetch = require("snekfetch");
const humanizeduration = require("humanize-duration");
const Discord = require('discord.js');

module.exports = {
    name: 'npm',
    description: 'Searches up an npm package',
    usage: '<npm package>',
    args: true,
    aliases: ['npmsearch'],
	async execute(bot, message, args){
        if (args.length > 0) {
            snekfetch.get("https://skimdb.npmjs.com/registry/" + args[0].toLowerCase()).then((body) => {
                let npmEmbed = new Discord.RichEmbed()
                .setAuthor("npm package", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1280px-Npm-logo.svg.png")
                .setColor(0xc0392b)
                .addField("Name", `${body.body.name}`, true)
                .addField("Description", body.body.description, true)
                .addField("Author", `${body.body.author.name}`, true)
                .addField("Latest", `${body.body["dist-tags"].latest}`, true)
                .addField("GitHub", `${((body.body.repository) ? body.body.repository.url.replace("git+", "").replace(".git", "").replace("git://", "https://").replace("git@github.com:", "https://github.com/") : "No Repository")}`, true)
                .addField("Maintainers", `${body.body.maintainers.map((m) => m.name).join(", ")}`, true)
                .addField('Last Updated',humanizeduration(Date.now() - new Date(body.body.time[body.body["dist-tags"].latest]).getTime(), {
                    round: true,
                    largest: 2
                }))
                .setFooter(`Information about ${body.body.name}`)
                .setTimestamp();
    
                message.channel.send(npmEmbed);
            }).catch((error) => {
                if (error.status === 404) return message.channel.send({
                    embed: {
                        title: "ERROR!",
                        color: 0xc0392b,
                        description: "An error occured while fetching that npm package"
                    }
                })
                console.error("Failed to grab NPM Package.", error.message);
                message.reply("NPM Package **" + args[0] + "** was not found") 
            })
        } else {
            message.channel.send({
                    embed: {
                        title: "Error!",
                        color: 0xc0392b,
                        description: "Missing `<name>` argument."
                    }
                });
        }
	},
};
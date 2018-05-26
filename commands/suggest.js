const Discord = require('discord.js');
var fs = require('fs');
var dbFile = '../sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

module.exports = {
    name: 'suggest',
    description: 'Suggest a command for ium.',
    usage: '<suggestion>',
    args: true,
    execute(bot, message, args){
        db.serialize(function(){
                if (!exists) {
                        db.run('CREATE TABLE suggestions ( ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Content varchar(2000), Author varchar(32) );');
                        console.log('New table suggestions created!');
                }
        });
	db.run(`INSERT INTO suggestions (Content, Author) VALUES ('${args.join(" ")}', '${message.author.id}');`);
	db.each(`SELECT * FROM suggestions WHERE Author='${message.author.id}' AND Content='${args.join(" ")}';`, function(err, row){
        let suggestEmbed = new Discord.RichEmbed()
        .setAuthor("Suggestion", "https://ium-bot.github.io/ium.jpg")
        .addField("User", `${message.author.tag}`)
        .addField("Suggestion", `${args.join(" ")}`)
	      .setFooter(row.ID)
        .setTimestamp();
        bot.channels.filter(c => c.id === '415707252486438913').forEach(channel => channel.send(suggestEmbed));
        message.channel.send(`<:check:314349398811475968> Your suggestion has been sent! Thanks!`);
	});
    },
};
    

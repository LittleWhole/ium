const Discord = require("discord.js");
const cheerio = require('cheerio')
	, snekfetch = require('snekfetch')
	, querystring = require('querystring');


module.exports.run = async (bot,message,args) => {
    const term = args.join(' ');
	let searchMessage = await message.channel.send('Searching 🔍....');
	let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(term)}`;
    return snekfetch.get(searchUrl)
        try {
			let $ = cheerio.load(result.text);
			let googleData = $('.r')
				.first()
				.find('a')
				.first()
				.attr('href');
			googleData = querystring.parse(googleData.replace('/url?', ''));
			searchMessage.edit(`Result found!\n${googleData.q}`);
        }
		catch(err) {
			searchMessage.edit('**No results found.**');
        };

};
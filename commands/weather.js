const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');

  module.exports = {
      name: 'weather',
      description: 'Displays the weather of a city or place you provide.',
      usage: '<city>',
      args: true,
      async execute(bot, message, args){
        const query = args.join(" ");

        const { body } = await snekfetch
            .get('https://query.yahooapis.com/v1/public/yql')
            .query({
                q: `select * from weather.forecast where u='f' AND woeid in (select woeid from geo.places(1) where text="${query}")`, // eslint-disable-line max-len
                format: 'json'
            });
        if (!body.query.count) return msg.say('Location Not Found.');
        const embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setAuthor(`${body.query.results.channel.location.city}, ${body.query.results.channel.location.country}`, 'https://ium-bot.github.io/ium.jpg')
            .setURL(body.query.results.channel.link)
            .setTimestamp()
            .addField('City',
                body.query.results.channel.location.city, true)
            .addField('Country',
                body.query.results.channel.location.country, true)
            .addField('Region',
                body.query.results.channel.location.region, true)
            .addField('Condition',
                body.query.results.channel.item.condition.text, true)
            .addField('Temperature',
                `${body.query.results.channel.item.condition.temp}°F`, true)
            .addField('Humidity',
                body.query.results.channel.atmosphere.humidity, true)
            .addField('Pressure',
                body.query.results.channel.atmosphere.pressure, true)
            .addField('Rising',
                body.query.results.channel.atmosphere.rising, true)
            .addField('Visibility',
                body.query.results.channel.atmosphere.visibility, true)
            .addField('Wind Chill',
                body.query.results.channel.wind.chill, true)
            .addField('Wind Direction',
                body.query.results.channel.wind.direction, true)
            .addField('Wind Speed',
                body.query.results.channel.wind.speed, true)
            .setFooter(`Powered by Yahoo Weather`);
        return message.channel.send(embed).catch(console.error);
      },
  };
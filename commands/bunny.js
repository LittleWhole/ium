const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("request");

module.exports = {
	  name: 'bunny',
    description: 'Sends a random image of a bunny.',
    aliases: ['rabbit'],
    async execute (bot, message, args){
      let imgs = Math.floor(Math.random() * 80);
      let url = ['https://www.reddit.com/r/Rabbits/.json?sort=rising&t=hour&limit=100'];
      request({
        method: 'GET',
        uri: url[Math.floor(Math.random() * url.length)]
      }, function (err, response, data) {
        if(err) {
          console.log(err, null);
          return;
        }
    
      data = JSON.parse(data);
      var mainObj = data.data.children;
      var urls = {};
    
      for(let i = 0; i < mainObj.length; i++) {
      let url = mainObj[i].data.url;
      urls[i+1] = url;
        }
      const embed = new Discord.RichEmbed()
      .setTitle("Bunny :rabbit:")
      .setColor("#bf8aff")
      .setImage(urls[imgs])
      message.channel.send({embed});
    
      if(bot.user && message.content === "undefined") {
          message.delete()
      }})
    },
};
    


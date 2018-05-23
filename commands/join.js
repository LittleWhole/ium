const { Discord } = require('discord.js');
const yt = require('ytdl-core');
const tokens = require('../botconfig.json');

let queue = {};

module.exports = {
    name: 'join',
    description: 'Joins the voice channel you are in.',
    aliases: ['connect'],
    execute(bot, message, args){
      return new Promise((resolve, reject) => {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
        voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
      });
    },
};
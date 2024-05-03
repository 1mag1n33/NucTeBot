const { Events } = require('discord.js');

module.exports = {
    name: Events.ShardReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        
    },
};
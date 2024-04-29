const { Events } = require('discord.js');

module.exports = {
    name: Events.ShardDisconnect,
    once: false,
    async execute(event, shardID) {
        console.log(`Shard ${shardID} disconnected. Reason: ${event.reason}`);

        console.log(`Attempting to reconnect Shard ${shardID}...`);
        await event.manager.respawn(shardID).catch(console.error);
    },
};

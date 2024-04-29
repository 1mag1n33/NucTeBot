const { Events } = require('discord.js');

module.exports = {
    name: Events.ShardError,
    once: false,
    async execute(error, shardID) {
        console.error(`Error on Shard ${shardID}: ${error.message}`);
        
        console.log(`Restarting Shard ${shardID}...`);
        try {
            process.exit(1);
        } catch (e) {
            console.error(`Failed to restart Shard ${shardID}: ${e.message}`);
        }
    },
};

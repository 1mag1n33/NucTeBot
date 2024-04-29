const { ShardingManager, Events } = require('discord.js');
const config = require("config");
const path = require("path");

const TOKEN = config.get("discord.bot_token");
const manager = new ShardingManager('./src/bot.js', { token: TOKEN });

manager.on('shardCreate', shard => {
  console.log(`Shard ${shard.id} launched`);
});
manager.spawn();
const mongoose = require('mongoose');
const config = require('config');
const { Events, ActivityType } = require('discord.js');


module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity({
            name: "NucTe",
            type: ActivityType.Watching,
          });
        await mongoose.connect(`${config.get("mongodb.uri")}/${config.get("mongodb.dbName")}`);
        console.log('MongoDB connected');
    },
};

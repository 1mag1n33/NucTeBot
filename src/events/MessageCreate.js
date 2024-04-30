const { Events } = require('discord.js');
const Response = require('../models/Response')

module.exports = {
    name: Events.MessageCreate,
    once: true,
    async execute(message) {
        const content = message.content.toLowerCase();

        const triggers = await Response.find({}, 'trigger'); 
        for (const trigger of triggers) {
            const regex = new RegExp(`\\b${trigger.trigger}\\b`, 'gi');
            if (content.match(regex)) {
                const response = await Response.findOne({ trigger: trigger.trigger });
                if (response) {
                    message.reply(response.response);
                    break;
                }
            }
        }
    },
};

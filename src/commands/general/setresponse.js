const Response = require('../../models/Response');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setresponse")
        .setDescription("Sets a custom response for a specific trigger phrase.") 
        .addStringOption(option =>
            option.setName("trigger")
                .setDescription("The trigger phrase.")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("response")
                .setDescription("The response to set.")
                .setRequired(true)),
    async execute(interaction) {
        const trigger = interaction.options.getString('trigger');
        const response = interaction.options.getString('response');
 
        await Response.create({ trigger, response });

        await interaction.reply(`Custom response set for trigger "${trigger}".`);
    },
};
const Response = require('../../models/Response');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removeresponse")
        .setDescription("Removes a custom response for a specific trigger phrase.")
        .addStringOption(option =>
            option.setName("trigger")
            .setDescription("The trigger phrase.")
            .setRequired(true)),

            
    async execute(interaction) {
        const trigger = interaction.options.getString('trigger');
        await Response.deleteOne({ trigger });

        await interaction.reply(`Custom response removed for trigger "${trigger}".`);
    },
};
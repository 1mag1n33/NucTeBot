const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const message = interaction.options.getString('message');
        await interaction.reply(message);
    },
};
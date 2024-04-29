const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('temp')
        .setDescription('template'),
    async execute(interaction) {
        try {

            await interaction.reply("{ content: catImageUrl }");
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch a cat picture.');
        }
    },
};
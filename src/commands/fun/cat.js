const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search');
            const catImageUrl = response.data[0].url;
            await interaction.reply({ content: catImageUrl });
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch a cat picture.');
        }
    },
};

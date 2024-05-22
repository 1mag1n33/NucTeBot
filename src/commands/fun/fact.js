const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        try {
            const response = await axios.get('https://api.chucknorris.io/jokes/random');
            const fact = response.data.value;
            await interaction.reply({ content: fact });
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch a fun fact.');
        }
    },
};

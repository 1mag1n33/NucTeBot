const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        try {
            const response = await axios.get('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            await interaction.reply(response.data.joke);
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch a joke.');
        }
    }
};

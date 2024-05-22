const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
   async execute(interaction) {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response.data;
            await interaction.reply(`"${quote.content}" - ${quote.author}`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch a quote.');
        }
    }
};

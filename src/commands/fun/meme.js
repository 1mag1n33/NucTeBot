const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        try {
            const response = await axios.get('https://www.reddit.com/r/memes/random.json');
            const meme = response.data[0].data.children[0].data;
            await interaction.reply(meme.url);
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to fetch a meme.');
        }
    }
};

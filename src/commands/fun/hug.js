const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.reply(`*Hugs ${user} tightly*`);
    },
};

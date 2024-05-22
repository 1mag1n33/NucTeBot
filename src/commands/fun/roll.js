const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const numDice = interaction.options.getInteger('num_dice', true);
        const numSides = interaction.options.getInteger('num_sides', true);
        if (numDice < 1 || numSides < 2) {
            return await interaction.reply('Invalid input. Please use positive integers for both number of dice and number of sides.');
        }
        const rolls = [];
        for (let i = 0; i < numDice; i++) {
            rolls.push(Math.floor(Math.random() * numSides) + 1);
        }
        await interaction.reply(`You rolled: ${rolls.join(', ')}. Total: ${rolls.reduce((a, b) => a + b, 0)}.`);
    },
};

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a specified number of dice with a specified number of sides.')
        .addIntegerOption(option =>
            option.setName('num_dice')
                .setDescription('The number of dice to roll.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('num_sides')
                .setDescription('The number of sides for each die.')
                .setRequired(true)),
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

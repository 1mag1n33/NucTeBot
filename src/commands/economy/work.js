const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('work')
        .setDescription('Work to earn money.'),
    async execute(interaction) {
        // Implement your logic here
    },
};
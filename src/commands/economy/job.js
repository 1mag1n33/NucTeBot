const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('job')
        .setDescription('Choose your job.'),
    async execute(interaction) {
        // Implement your logic here
    },
};
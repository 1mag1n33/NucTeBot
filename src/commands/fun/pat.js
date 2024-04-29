const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Pats another user on the head.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to pat.')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.reply(`*Pats ${user} gently on the head*`);
    },
};
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the current server.'),
    async execute(interaction) {
        const guild = interaction.guild;
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Server Info for ${guild.name}`)
            .setDescription(`Total Members: ${guild.memberCount}\nCreated: ${guild.createdAt}`);
        await interaction.reply({ embeds: [embed] });
    },
};

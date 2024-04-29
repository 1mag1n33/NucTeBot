const { SlashCommandBuilder, EmbedBuilder  } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a specific user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to display information about.')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`User Info for ${user.tag}`)
            .setDescription(`User ID: ${user.id}\nJoined Discord: ${user.createdAt}`);
        await interaction.reply({ embeds: [embed] });
    },
};

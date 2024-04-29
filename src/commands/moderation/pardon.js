const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pardon')
        .setDescription('Select a member and unban them.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to pardon')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const bot = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.guild.members.cache.get(user.id);

        if (!bot.permissions.has('BAN_MEMBERS')) {
            return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }
        const bans = await interaction.guild.bans.fetch();
        if (!bans.has(user.id)) {
            return await interaction.reply({ content: 'The user is not banned', ephemeral: true });
        }
        try {
            await interaction.guild.members.unban(user.id);
            await interaction.reply({ content: `Unbanned <@${user.id}> from the server` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error unbanning the user', ephemeral: true });
        }
    },
};

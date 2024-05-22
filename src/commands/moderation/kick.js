const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const bot = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.guild.members.cache.get(user.id);
        
        if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
            return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }

        if (!bot.permissions.has(PermissionFlagsBits.KickMembers)) {
            return await interaction.reply({ content: 'I do not have permission to kick members', ephemeral: true });
        }

        try {
            await interaction.guild.members.kick(member, { reason });
            await interaction.reply({ content: `Kicked <@${user.id}> from the server. Reason: ${reason}` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error banning the user', ephemeral: true });
        }
    },
};

const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const bot = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.guild.members.cache.get(user.id);
        
        if (!bot.permissions.has(PermissionFlagsBits.BanMembers)) {
            const Dembed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`You do not have permission to use this command`);
            return await interaction.reply({ embeds: [Dembed] , ephemeral: true });
        }


        try {
            await interaction.guild.members.ban(user.id, { reason });
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Ban info')
                .setDescription(`**Banned:** ${user.username} <@${user.id}> from the server. \n **Reason:** ${reason} \n **By:** <@${interaction.user.id}>`);
            await interaction.reply({ embeds: [embed]})
        } catch (error) {
            console.error(error);
            const Bembed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`There was an error baning the user`)
                .setDescription('Check the console or get in contact with the bot developer');
            await interaction.reply({ embeds: [Bembed], ephemeral: true });
        }
    },
};

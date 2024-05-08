const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    async execute(interaction) {
        const { user } = interaction;
        try {
            const existingUser = await User.findOne({ userId: user.id });
            if (existingUser) {
                return interaction.reply({ content: 'You are already registered.', ephemeral: true });
            }
            await User.create({ userId: user.id, balance: 0 });
            await interaction.reply({ content: 'You have been registered. You can now start using the economy system.', ephemeral: true });
        } catch (error) {
            console.error('Error registering user:', error);
            await interaction.reply({ content: 'An error occurred while registering. Please try again later.', ephemeral: true });
        }
    },
};

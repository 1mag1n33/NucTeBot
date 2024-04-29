const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance.'),
    async execute(interaction) {
        const { user } = interaction;
        const userDocument = await User.findOne({ userId: user.id });
        if (!userDocument) {
            await interaction.reply('Your not registered.');
        } else {
            const updatedUserDocument = await User.findOne({ userId: user.id });
            await interaction.reply(`Your balance is: ${updatedUserDocument.balance}`);
        }
        
    },
};

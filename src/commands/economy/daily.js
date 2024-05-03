const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily reward.'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const user = await User.findOne({ userId });

        if (!user) {
            return interaction.reply('You need to register first. Use the `/register` command.');
        }

        const now = new Date();
        const lastDaily = user.daily || 0;
        const oneDay = 24 * 60 * 60 * 1000;

        if (now - lastDaily < oneDay) {
            const remainingTime = new Date(lastDaily.getTime() + oneDay) - now;
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            return interaction.reply(`You can claim your daily reward in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`);
        }

        const reward = 100;
        await User.updateOne({ userId }, { $inc: { balance: reward }, $set: { daily: now } });
        await interaction.reply(`You have claimed your daily reward of ${reward} coins.`);
    },
};

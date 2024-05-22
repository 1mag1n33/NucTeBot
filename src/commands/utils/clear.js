const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        const numMessages = interaction.options.getInteger('num_messages', true);
        if (numMessages < 1 || numMessages > 100) {
            await interaction.reply('You can only clear between 1 and 100 messages. Use -1 or "all" to clear the entire channel.');
        } else {
            try {
                await interaction.channel.bulkDelete(numMessages, true);
                await interaction.reply(`Cleared ${numMessages} messages.`);
            } catch (error) {
                console.error(error);
                await interaction.reply('There was an error while clearing messages.');
            }
        }
    },
};

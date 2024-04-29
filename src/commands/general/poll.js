const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Starts a poll with reactions for voting.')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question for the poll.')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question', true);
        const pollEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Poll')
            .setDescription(question)
            .setFooter({ text: `Poll started by ${interaction.user.tag}` });
        
        const pollMessage = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
        await pollMessage.react('👍');
        await pollMessage.react('👎');
    },
};

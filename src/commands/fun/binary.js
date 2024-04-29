const { SlashCommandBuilder } = require('discord.js');

function isBinary(str) {
    return /^[01 ]+$/.test(str);
}

function binaryToText(binary) {
    const response = binary.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
    return `\`${binary}\` in text: \`${response}\``
}

function textToBinary(text) {
    const response = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    return `\`${text}\` in binary: \`${response}\``
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('binary')
        .setDescription('Converts text to binary and vice versa.')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The text or binary input to convert.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        let output;
        if (isBinary(input)) {
            output = binaryToText(input);
        } else {
            output = textToBinary(input);
        }

        await interaction.reply(output);
    },
};

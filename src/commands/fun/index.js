const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription("A group of fun commands to use")
    .addSubcommand(subcommand =>
        subcommand
            .setName("binary")
            .setDescription('Converts text to binary and vice versa.')
            .addStringOption(option =>
                option.setName('input')
                    .setDescription('The text or binary input to convert.')
                    .setRequired(true)
            ))
    .addSubcommand(subcommand =>
        subcommand
            .setName('cat')
            .setDescription('Sends a random picture of a cat.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('fact')
        .setDescription('Sends a random fun fact.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('hug')
        .setDescription('Sends a virtual hug to another user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to hug.')
                .setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('joke')
        .setDescription('Get a random joke.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('meme')
        .setDescription('Get a random meme.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('pat')
        .setDescription('Pats another user on the head.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to pat.')
                .setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('quote')
        .setDescription('Get a random quote.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('roll')
        .setDescription('Rolls a specified number of dice with a specified number of sides.')
        .addIntegerOption(option =>
            option.setName('num_dice')
                .setDescription('The number of dice to roll.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('num_sides')
                .setDescription('The number of sides for each die.')
                .setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('say')
        .setDescription('Repeats your message.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to repeat.')
                .setRequired(true))
    ).toJSON()
}
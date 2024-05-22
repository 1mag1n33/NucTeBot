const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
	.setName('utils')
	.setDescription('utilites for the discord server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addSubcommand(subcommand => 
        subcommand
        .setName('clear')
        .setDescription('Clears a specified number of messages from the channel.')
        .addIntegerOption(option =>
            option.setName('num_messages')
                .setDescription('The number of messages to clear. Use -1 or "all" to clear the entire channel.')
                .setRequired(true))
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true))
    ).toJSON()
}
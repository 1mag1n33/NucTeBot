const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
	.setName('moderation')
	.setDescription('economy for the discord server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers, PermissionFlagsBits.BanMembers, PermissionFlagsBits.KickMembers)
    .setDMPermission(false)
    .addSubcommand(subcommand =>
        subcommand
        .setName('ban')
		.setDescription('Select a member and ban them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for banning'))
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for kicking'))
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('mute')
        .setDescription('Mute a user in the server')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to mute')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for muting the user')
        )
        .addStringOption(option =>
            option
                .setName('duration')
                .setDescription('The duration of the mute (e.g., 1d, 1h, 30m)')
        )
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('pardon')
        .setDescription('Select a member and unban them.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to pardon')
                .setRequired(true))
    ).toJSON()
}
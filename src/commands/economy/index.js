const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
	.setName('economy')
	.setDescription('economy for the discord server')
	.addSubcommand(subcommand =>
		subcommand
			.setName('balance')
			.setDescription('Check your balance.'))
	.addSubcommand(subcommand =>
		subcommand
            .setName('daily')
            .setDescription('Claim your daily reward.'))
    .addSubcommand(subcommand => 
        subcommand
            .setName('job')
            .setDescription('Choose your job.'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('register')
            .setDescription('Register to start using the economy system.'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('work')
            .setDescription('Work to earn money.'))
    .toJSON(),
    }
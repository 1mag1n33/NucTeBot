const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	async execute(interaction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const commandsDir = path.join(__dirname, '../../commands');
		const foundFiles = [];

		readFilesInDir(commandsDir, (filePath) => {
			const fileName = path.basename(filePath, '.js');
			if (fileName.toLowerCase() === commandName) {
				foundFiles.push(filePath);
			}
		});

		if (foundFiles.length === 0) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

		foundFiles.forEach((filePath) => {
			delete require.cache[require.resolve(filePath)];
			const newCommand = require(filePath);
			interaction.client.commands.set(newCommand.data.name, newCommand);
		});
		await interaction.reply(`Command(s) matching \`${commandName}\` were reloaded!`);
	},
};

function readFilesInDir(dir, fileCallback) {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			readFilesInDir(filePath, fileCallback);
		} else if (stats.isFile() && file.endsWith('.js')) {
			fileCallback(filePath);
		}
	});
}

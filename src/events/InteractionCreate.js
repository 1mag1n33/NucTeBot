const { Events, Collection } = require('discord.js');
const config = require('config');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const allowedChannels = config.get('discord.channels');
        const staffRoles = config.get('discord.staff_roles');
        const client = interaction.client;
        const memberRoles = interaction.member.roles.cache.map(role => role.id);
        const isStaff = staffRoles.some(role => memberRoles.includes(role));

        if (interaction.isCommand() && !allowedChannels.includes(interaction.channelId) && !isStaff) {
            return interaction.reply('You can only use this command in specific channels.');
        }

        let command = null;

        if (interaction.isChatInputCommand()) {
            command = client.commands.get(interaction.commandName);
        } else if (interaction.isAutocomplete()) {
            command = client.commands.get(interaction.commandName);
    
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }

        const commandName = interaction.commandName;
        if (!commandName) {
            console.error('Command name is undefined');
            return;
        }
        if (!command) {
            console.error(`No command matching ${commandName} was found.`);
            return;
        }

        const { cooldowns } = interaction.client;

        if (!cooldowns.has(commandName)) {
            cooldowns.set(commandName, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(commandName);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Please wait, you are on a cooldown for \`${commandName}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        if (typeof command.execute !== 'function') {
            console.error(`Command ${commandName} does not have an execute function.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};

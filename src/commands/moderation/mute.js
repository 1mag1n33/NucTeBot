const { SlashCommandBuilder, PermissionFlagsBits, Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
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
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        if (!user) {
            return await interaction.reply({ content: 'User not found', ephemeral: true });
        }
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const duration = interaction.options.getString('duration');
        const bot = interaction.guild.members.cache.get(interaction.client.user.id);
        const member = interaction.guild.members.cache.get(user.id);
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        }

        if (!bot.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return await interaction.reply({ content: 'I do not have permission to manage roles', ephemeral: true });
        }

        let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            try {
                muteRole = await interaction.guild.roles.create({
                    name: 'Muted',
                    permissions: [
                        {
                            id: PermissionFlagsBits.SendMessages,
                            type: 'ROLE',
                            permission: false,
                        },
                        {
                            id: PermissionFlagsBits.Speak,
                            type: 'ROLE',
                            permission: false,
                        },
                    ],
                });
            } catch (error) {
                console.error(error);
                return await interaction.reply({ content: 'There was an error creating the mute role', ephemeral: true });
            }
        }

        try {
            await member.roles.add(muteRole);

            if (duration) {
                setTimeout(async () => {
                    await member.roles.remove(muteRole);
                }, parseDuration(duration));
            }

            await interaction.reply({ content: `Muted <@${user.id}>. Reason: ${reason}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error muting the user', ephemeral: true });
        }
    },
};

function parseDuration(duration) {
    const match = duration.match(/^(\d+)([smhdw])$/);
    if (!match) return null;

    const [, value, unit] = match;
    switch (unit) {
        case 's':
            return value * 1000;
        case 'm':
            return value * 60000;
        case 'h':
            return value * 3600000;
        case 'd':
            return value * 86400000;
        case 'w':
            return value * 604800000;
        default:
            return null;
    }
}

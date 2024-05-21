const config = require('config');
const fs = require('node:fs');
const path = require('node:path');

const TOKEN = config.get("discord.bot_token");
const CLIENT_ID = config.get("discord.client_id");
const GUILD_ID = config.get("discord.guild_id");

const { Client, Collection, GatewayIntentBits, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildPresences] });

// Collections
client.commands = new Collection(); 
client.subcommands = new Collection();
client.cooldowns = new Collection();

// Load commands
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
    const indexPath = path.join(commandsPath, folder, 'index.js'); // Path to index.js
    const commandData = require(indexPath);

    if (commandData.data) {
        const cmdData = commandData.data;
        client.commands.set(cmdData.name, cmdData);
        commands.push({
            name: cmdData.name,
            description: cmdData.description,
            options: cmdData.options,
            category: folder
        });

        const commandFiles = fs.readdirSync(path.join(commandsPath, folder)).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            if (file === 'index.js') continue;

            const filePath = path.join(commandsPath, folder, file);
            const command = require(filePath);

            if (typeof command.execute === 'function') {
                client.subcommands.set(`${cmdData.name}:${path.parse(file).name}`, command.execute);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing the required "execute" function.`);
            }
        }
    } else {
        console.log(`[WARNING] The command at ${indexPath} is missing the required "data" object.`);
    }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Deploy commands
const rest = new REST().setToken(TOKEN);
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

client.login(TOKEN);

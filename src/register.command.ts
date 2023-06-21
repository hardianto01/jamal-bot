// import { REST, Routes } from 'discord.js';
// import 'dotenv/config'
// const token = process.env.TOKEN || ''
// const clientId = process.env.CLIENT_ID || ''
// const guildId = process.env.GUILD_ID || ''
// const rest = new REST().setToken(token);

// // and deploy your commands!
// export const registerCommands = async (commands: object[]) => {
// 	try {
// 		console.log(`Started refreshing ${commands.length} application (/) commands.`);

// 		// The put method is used to fully refresh all commands in the guild with the current set
// 		const data = await rest.put(
// 			Routes.applicationGuildCommands(clientId, guildId),
// 			{ body: commands },
// 		) as any;

// 		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
// 	} catch (error) {
// 		// And of course, make sure you catch and log any errors!
// 		console.error(error);
// 	}
// }

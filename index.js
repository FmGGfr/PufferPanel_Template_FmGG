require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { LavalinkClient, NodeOptions } = require("lavalink-client");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const nodes = [
  new NodeOptions({
    host: process.env.LAVALINK_HOST,
    port: Number(process.env.LAVALINK_PORT),
    password: process.env.LAVALINK_PASSWORD,
    secure: false
  })
];

const lavalink = new LavalinkClient(client, nodes);

client.once("ready", () => {
  console.log(`🤖 Connecté à Discord en tant que ${client.user.tag}`);
  lavalink.connect(); // ou méthode appropriée pour init
});

lavalink.on("nodeConnect", node => console.log(`✅ Node connecté : ${node.name}`));
lavalink.on("nodeError", (node, err) => console.error(`❌ Erreur Node ${node.name}: ${err.message}`));

client.on("messageCreate", async msg => {
  if (!msg.content.startsWith("$") || msg.author.bot) return;
  // commandes play / skip / stop…
});

client.login(process.env.DISCORD_TOKEN);
